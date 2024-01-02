import React from 'react'

const ProductDescription =  ({ description }) => {

      const paragraphs = description?.split('\n\n');
    
      return (
        <div>
          {paragraphs?.map((paragraph, index) => {
        
            const lines = paragraph.split('\n');
    
            return (
              <ul key={index}>
                {lines?.map((line, lineIndex) => (
                  <li key={lineIndex}>{line}</li>
                ))}
              </ul>
            );
          })}
        </div>
      );
    };
    

export default ProductDescription