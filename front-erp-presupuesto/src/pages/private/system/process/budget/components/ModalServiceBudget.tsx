import Modal from '@/components/Modal'
import React, { Dispatch, SetStateAction } from 'react'


export const DetailService: React.FC<{
    column: string;
    value: string | number | null;
    focus: boolean;
  }> = ({ column, value, focus }) => {
    return (
      <td className="border-2 py-2 px-3">
        <div className="flex gap-2">
          <div>{column}:</div>
          <div
            className={`${
              focus ? "text-red-500" : "text-black"
            } border-[0.1em] border-black px-2`}
          >
            {value}
          </div>
        </div>
      </td>
    );
  };
  
