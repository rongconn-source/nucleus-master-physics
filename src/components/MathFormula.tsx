import React, { useMemo } from 'react';
import katex from 'katex';

interface MathFormulaProps {
  tex: string;
  block?: boolean;
  className?: string;
}

export const MathFormula: React.FC<MathFormulaProps> = ({
  tex,
  block = false,
  className = '',
}) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(tex, {
        displayMode: block,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return tex;
    }
  }, [tex, block]);

  return (
    <span
      className={`${block ? 'block my-2 overflow-x-auto' : 'inline'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

interface MathTextProps {
  text: string;
  className?: string;
}

/**
 * Renders text mixed with LaTeX expressions delimited by $$...$$ (block) or $...$ (inline).
 */
export const MathText: React.FC<MathTextProps> = ({ text, className = '' }) => {
  const renderedHtml = useMemo(() => {
    if (!text) return '';
    // First replace block math $$...$$
    let processed = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
      try {
        return katex.renderToString(math.trim(), {
          displayMode: true,
          throwOnError: false,
          strict: false,
        });
      } catch {
        return `$$${math}$$`;
      }
    });

    // Then replace inline math $...$
    processed = processed.replace(/\$([^$\n]+?)\$/g, (_, math) => {
      try {
        return katex.renderToString(math.trim(), {
          displayMode: false,
          throwOnError: false,
          strict: false,
        });
      } catch {
        return `$${math}$`;
      }
    });

    return processed;
  }, [text]);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};
