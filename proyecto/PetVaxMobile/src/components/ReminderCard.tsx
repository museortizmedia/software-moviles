import React from 'react';
import { Card } from './Card';
import { PetVaxColors } from '../colors';

interface Props {
  icon?: React.ReactNode;
  title?: string;
  description?: string;

  nextLabel?: string;
  nextDate?: string | Date | null;

  children?: React.ReactNode;

  // 🧩 SLOTS DE ACCIÓN
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  headerActions?: React.ReactNode;

  footer?: React.ReactNode;
}

export const ReminderCard: React.FC<Props> = ({
  icon,
  title,
  description,
  nextLabel,
  nextDate,
  children,
  leftAction,
  rightAction,
  headerActions,
  footer,
}) => {
  const formatDate = (date?: string | Date | null) => {
    if (!date) return 'Sin fecha';

    const d = new Date(date);
    if (isNaN(d.getTime())) return 'Fecha inválida';

    return new Intl.DateTimeFormat('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(d);
  };

  return (
    <Card>
      {/* HEADER */}
      <div className="flex items-start justify-between mb-2">

        {/* LEFT SIDE */}
        <div className="flex items-start gap-2">

          {/* LEFT ACTION (TOGGLE) */}
          {leftAction && (
            <div className="pt-1">
              {leftAction}
            </div>
          )}

          {/* ICON + TEXT */}
          <div className="text-[#00685f] pt-1">
            {icon}
          </div>

          <div>
            <h3 className="font-semibold text-black">{title}</h3>
            <p className="text-xs text-gray-500">{description}</p>

            {/* HEADER ACTIONS EXTRA */}
            {headerActions && (
              <div className="mt-1">
                {headerActions}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT ACTION */}
        {rightAction && (
          <div className="pt-1">
            {rightAction}
          </div>
        )}
      </div>

      {/* BODY */}
      {children}

      {/* FOOTER DEFAULT O CUSTOM */}
      {footer ? (
        footer
      ) : (
        <div
          className="mt-3 p-3 rounded-lg flex items-center justify-between"
          style={{ backgroundColor: `${PetVaxColors.primary}10` }}
        >
          <span className="text-xs font-medium text-[#00685f]">
            {nextLabel}
          </span>

          <span className="text-xs text-black font-semibold">
            {formatDate(nextDate)}
          </span>
        </div>
      )}
    </Card>
  );
};