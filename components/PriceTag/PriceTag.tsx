import React from 'react';
import './PriceTag.css';

const CURRENCY_SYMBOLS: Record<string, string> = {
  EUR: '€',
  USD: '$',
  GBP: '£',
  JPY: '¥',
};

export interface PriceTagProps {
  /** Currency code */
  currency?: 'EUR' | 'USD' | 'GBP' | 'JPY';

  /** Whole units (integer part), e.g. "1.250" */
  wholeUnits?: string;

  /** Cents (decimal part), e.g. "99" */
  amount?: string;

  /** Show cents/decimal part */
  showCents?: boolean;

  /** Decimal separator style */
  decimal?: 'comma' | 'dot';

  /** Unit label text, e.g. "unit", "night", "month" */
  unit?: string;

  /** Show the unit label */
  showUnit?: boolean;

  /** Size variant */
  size?: 'md' | 'sm';

  /** Additional CSS classes */
  className?: string;
}

export const PriceTag: React.FC<PriceTagProps> = ({
  currency = 'EUR',
  wholeUnits = '0',
  amount = '00',
  showCents = true,
  decimal = 'comma',
  unit = 'unit',
  showUnit = true,
  size = 'md',
  className = '',
}) => {
  const symbol = CURRENCY_SYMBOLS[currency] || currency;
  const separator = decimal === 'comma' ? ',' : '.';

  const priceTagClasses = [
    'muka-price-tag',
    `muka-price-tag--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={priceTagClasses}>
      <div className="muka-price-tag__amount">
        <span className="muka-price-tag__currency">{symbol}</span>
        <span className="muka-price-tag__numbers">
          <span className="muka-price-tag__whole">{wholeUnits}</span>
          {showCents && (
            <>
              <span className="muka-price-tag__decimal">{separator}</span>
              <span className="muka-price-tag__cents">{amount}</span>
            </>
          )}
        </span>
      </div>
      {showUnit && (
        <span className="muka-price-tag__unit">/{unit}</span>
      )}
    </div>
  );
};

export default PriceTag;
