import { MouseEventHandler, useRef } from 'react';
import { useBoolean } from 'shared/hooks';
import * as Styles from './Button.styles';
import { ButtonProps } from './types';

export const buttonClasses = {
  startIcon: 'startIcon',
  endIcon: 'endIcon',
};

export const Button = ({
  children,
  variant = 'contained',
  small = false,
  color = 'primary',
  startIcon,
  endIcon,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  as = 'button',
  ...props
}: ButtonProps) => {
  const touched = useBoolean();
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
    touched.setTrue();
    onMouseDown?.(e);
  };

  const handleMouseUpOrLeave: MouseEventHandler<HTMLButtonElement> = (e) => {
    timeout.current = setTimeout(() => {
      touched.setFalse();
    }, 100);

    if (e.type === 'mouseup') {
      onMouseUp?.(e);
    }
    if (e.type === 'mouseleave') {
      onMouseLeave?.(e);
    }
  };

  return (
    <Styles.Root
      as={as}
      color={color}
      small={small}
      variant={variant}
      touched={touched.state}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      {...props}
    >
      {startIcon && (
        <Styles.StartIcon className={buttonClasses.startIcon}>{startIcon}</Styles.StartIcon>
      )}
      {children}
      {endIcon && <Styles.EndIcon className='endIcon'>{endIcon}</Styles.EndIcon>}
    </Styles.Root>
  );
};
