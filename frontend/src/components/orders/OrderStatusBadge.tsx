import React from 'react';
import { OrderStatus } from '../../types';
import { Badge } from '../ui/Badge';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  size?: 'sm' | 'md';
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, size = 'md' }) => {
  switch (status) {
    case 'Confirmed':
      return (
        <Badge variant="info" size={size} dot>
          Confirmed
        </Badge>
      );
    case 'Processing':
      return (
        <Badge variant="purple" size={size} dot>
          Processing
        </Badge>
      );
    case 'Shipped':
      return (
        <Badge variant="warning" size={size} dot>
          Shipped
        </Badge>
      );
    case 'Delivered':
      return (
        <Badge variant="success" size={size} dot>
          Delivered
        </Badge>
      );
    case 'Cancelled':
      return (
        <Badge variant="danger" size={size} dot>
          Cancelled
        </Badge>
      );
    default:
      return (
        <Badge variant="default" size={size}>
          {status}
        </Badge>
      );
  }
};
