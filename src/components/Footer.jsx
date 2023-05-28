import React from "react";
import Image from "next/image";
import CreativeCommons from "../public/by-nc-nd.eu.png";

export { Footer };

function Footer() {
  return (
    <div className="md:px-6 md:py-2">
      <div className="mx-auto px-6">        
        <div className="flex py-4">
          <div className="ml-2">          
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://creativecommons.org/about/cclicenses/#nd"
            >
              <Image
                className="max-h-8 w-auto"
                src={CreativeCommons}
                alt="Creative Commons License"
              />
            </a>
          </div>
          
        </div>
      </div>
    </div>
  );
}
