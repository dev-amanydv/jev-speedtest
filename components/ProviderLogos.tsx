import React from 'react';

export function OpenAIIcon({ className = 'w-2.5 h-2.5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 611 611"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M252.794 108.802C289.191 99.0484 326.265 110.305 351.148 135.135C385.113 126.072 422.85 134.862 449.492 161.505C476.136 188.149 484.925 225.888 475.862 259.85V259.854C500.696 284.735 511.95 321.81 502.198 358.207C492.447 394.602 464.161 421.084 430.215 430.217C421.083 464.162 394.603 492.448 358.206 502.199C321.812 511.951 284.734 500.693 259.852 475.864C225.887 484.927 188.15 476.137 161.507 449.495C134.864 422.851 126.073 385.111 135.136 351.149C110.304 326.266 99.0496 289.192 108.801 252.795C118.552 216.4 146.84 189.918 180.784 180.785C189.917 146.841 216.396 118.553 252.794 108.802ZM374.292 407.145C374.292 411.271 372.092 415.086 368.517 417.148L283.723 466.102C302.487 480.585 327.555 486.459 352.217 479.852C386.997 470.532 410.068 439.312 410.555 405.006V317.717C410.555 315.08 409.125 312.621 406.843 311.303L374.292 292.509V407.145ZM251.868 415.897C248.296 417.959 243.893 417.959 240.317 415.897L155.526 366.942C152.366 390.436 159.811 415.08 177.866 433.136H177.863C203.325 458.594 241.896 462.962 271.85 446.232L347.449 402.586C349.735 401.268 351.148 398.8 351.148 396.163V358.579L251.868 415.897ZM368.602 220.628C366.319 219.309 363.474 219.318 361.191 220.637L328.641 239.431L427.921 296.749C431.496 298.811 433.697 302.627 433.697 306.752V404.661C455.622 395.654 473.244 376.881 479.851 352.218C489.169 317.442 473.668 281.85 444.201 264.274L368.602 220.628ZM177.303 206.34C155.377 215.348 137.756 234.122 131.148 258.783C121.832 293.561 137.331 329.153 166.799 346.727L242.398 390.373C244.68 391.692 247.525 391.684 249.807 390.366L282.357 371.572L183.078 314.253C179.504 312.189 177.303 308.375 177.303 304.251V206.34ZM259.849 279.145V331.858L305.5 358.213L351.15 331.858V279.145L305.5 252.789L259.849 279.145ZM327.276 144.9C308.512 130.418 283.445 124.543 258.782 131.15C224.002 140.471 200.931 171.691 200.445 205.995V293.286C200.445 295.923 201.875 298.381 204.158 299.7L236.707 318.493V203.856C236.707 199.731 238.909 195.916 242.483 193.853L327.276 144.9ZM433.137 177.867C407.675 152.407 369.103 148.038 339.149 164.769L263.55 208.415C261.265 209.734 259.852 212.202 259.852 214.838V252.423L359.132 195.105C362.703 193.041 367.108 193.041 370.682 195.105L455.473 244.06C458.635 220.567 451.189 195.922 433.135 177.867H433.137Z"
      />
    </svg>
  );
}

export function ClaudeIcon({ className = 'w-2.5 h-2.5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 257"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        fill="#D97757"
        d="m50.228 170.321 50.357-28.257.843-2.463-.843-1.361h-2.462l-8.426-.518-28.775-.778-24.952-1.037-24.175-1.296-6.092-1.297L0 125.796l.583-3.759 5.12-3.434 7.324.648 16.202 1.101 24.304 1.685 17.629 1.037 26.118 2.722h4.148l.583-1.685-1.426-1.037-1.101-1.037-25.147-17.045-27.22-18.017-14.258-10.37-7.713-5.25-3.888-4.925-1.685-10.758 7-7.713 9.397.649 2.398.648 9.527 7.323 20.35 15.75L94.817 91.9l3.889 3.24 1.555-1.102.195-.777-1.75-2.917-14.453-26.118-15.425-26.572-6.87-11.018-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0 82.05 1.426l4.472 3.888 6.61 15.101 10.694 23.786 16.591 32.34 4.861 9.592 2.592 8.879.973 2.722h1.685v-1.556l1.36-18.211 2.528-22.36 2.463-28.776.843-8.1 4.018-9.722 7.971-5.25 6.222 2.981 5.12 7.324-.713 4.73-3.046 19.768-5.962 30.98-3.889 20.739h2.268l2.593-2.593 10.499-13.934 17.628-22.036 7.778-8.749 9.073-9.657 5.833-4.601h11.018l8.1 12.055-3.628 12.443-11.342 14.388-9.398 12.184-13.48 18.147-8.426 14.518.778 1.166 2.01-.194 30.46-6.481 16.462-2.982 19.637-3.37 8.88 4.148.971 4.213-3.5 8.62-20.998 5.184-24.628 4.926-36.682 8.685-.454.324.519.648 16.526 1.555 7.065.389h17.304l32.21 2.398 8.426 5.574 5.055 6.805-.843 5.184-12.962 6.611-17.498-4.148-40.83-9.721-14-3.5h-1.944v1.167l11.666 11.406 21.387 19.314 26.767 24.887 1.36 6.157-3.434 4.86-3.63-.518-23.526-17.693-9.073-7.972-20.545-17.304h-1.36v1.814l4.73 6.935 25.017 37.59 1.296 11.536-1.814 3.76-6.481 2.268-7.13-1.297-14.647-20.544-15.1-23.138-12.185-20.739-1.49.843-7.194 77.448-3.37 3.953-7.778 2.981-6.48-4.925-3.436-7.972 3.435-15.749 4.148-20.544 3.37-16.333 3.046-20.285 1.815-6.74-.13-.454-1.49.194-15.295 20.999-23.267 31.433-18.406 19.702-4.407 1.75-7.648-3.954.713-7.064 4.277-6.286 25.47-32.405 15.36-20.092 9.917-11.6-.065-1.686h-.583L44.07 198.125l-12.055 1.555-5.185-4.86.648-7.972 2.463-2.593 20.35-13.999-.064.065Z"
      />
    </svg>
  );
}

export function GeminiIcon({ className = 'w-2.5 h-2.5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 296 298"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <mask
        id="gemini-icon-mask"
        width="296"
        height="298"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
        style={{ maskType: 'alpha' }}
      >
        <path
          fill="#3186FF"
          d="M141.201 4.886c2.282-6.17 11.042-6.071 13.184.148l5.985 17.37a184.004 184.004 0 0 0 111.257 113.049l19.304 6.997c6.143 2.227 6.156 10.91.02 13.155l-19.35 7.082a184.001 184.001 0 0 0-109.495 109.385l-7.573 20.629c-2.241 6.105-10.869 6.121-13.133.025l-7.908-21.296a184 184 0 0 0-109.02-108.658l-19.698-7.239c-6.102-2.243-6.118-10.867-.025-13.132l20.083-7.467A183.998 183.998 0 0 0 133.291 26.28l7.91-21.394Z"
        />
      </mask>
      <g mask="url(#gemini-icon-mask)">
        <g filter="url(#gemini-b)">
          <ellipse cx="163" cy="149" fill="#3689FF" rx="196" ry="159" />
        </g>
        <g filter="url(#gemini-c)">
          <ellipse cx="33.5" cy="142.5" fill="#F6C013" rx="68.5" ry="72.5" />
        </g>
        <g filter="url(#gemini-d)">
          <ellipse cx="19.5" cy="148.5" fill="#F6C013" rx="68.5" ry="72.5" />
        </g>
        <g filter="url(#gemini-e)">
          <path fill="#FA4340" d="M194 10.5C172 82.5 65.5 134.333 22.5 135L144-66l50 76.5Z" />
        </g>
        <g filter="url(#gemini-f)">
          <path fill="#FA4340" d="M190.5-12.5C168.5 59.5 62 111.333 19 112L140.5-89l50 76.5Z" />
        </g>
        <g filter="url(#gemini-g)">
          <path fill="#14BB69" d="M194.5 279.5C172.5 207.5 66 155.667 23 155l121.5 201 50-76.5Z" />
        </g>
        <g filter="url(#gemini-h)">
          <path fill="#14BB69" d="M196.5 320.5C174.5 248.5 68 196.667 25 196l121.5 201 50-76.5Z" />
        </g>
      </g>
      <defs>
        <filter id="gemini-b" width="464" height="390" x="-69" y="-46" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="18" />
        </filter>
        <filter id="gemini-c" width="265" height="273" x="-99" y="6" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="32" />
        </filter>
        <filter id="gemini-d" width="265" height="273" x="-113" y="12" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="32" />
        </filter>
        <filter id="gemini-e" width="299.5" height="329" x="-41.5" y="-130" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="32" />
        </filter>
        <filter id="gemini-f" width="299.5" height="329" x="-45" y="-153" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="32" />
        </filter>
        <filter id="gemini-g" width="299.5" height="329" x="-41" y="91" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="32" />
        </filter>
        <filter id="gemini-h" width="299.5" height="329" x="-39" y="132" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="32" />
        </filter>
      </defs>
    </svg>
  );
}

export function TypesafeAiIcon({ className = 'w-2.5 h-3.5' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 98.9 144"
      className={className}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M76.458 17.565v24.833l22.357 14.524.006 54.989L49.405 144l-27.041-17.559V100.92L0 86.396v-54.3l2.129-1.387L49.41 0zM35.604 123.9l13.795 8.959 36.163-23.496-13.788-8.952zm18.472-61.904v24.407l-22.37 14.525v14.365l35.41-22.996V53.529zm22.382 30.313 13.015 8.454V61.989l-13.015-8.454zM13.247 83.86l13.788 8.96 13.794-8.96-13.788-8.953zM9.342 37.162V75.26l13.022-8.46V42.392L44.74 27.856v-13.69zm22.364 29.632 13.028 8.46V61.989l-13.028-8.46zm3.898-21.871 13.807 8.965 13.794-8.96-13.8-8.964zm18.478-17.067 13.033 8.466V22.638l-13.033-8.473z"
      />
    </svg>
  );
}

export function TypesafeAiWordmark({ className = 'h-3.5 w-auto' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 734 144"
      className={className}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M76.458 17.565v24.833l22.357 14.524.006 54.989L49.405 144l-27.041-17.559V100.92L0 86.396v-54.3l2.129-1.387L49.41 0zM35.604 123.9l13.795 8.959 36.163-23.496-13.788-8.952zm18.472-61.904v24.407l-22.37 14.525v14.365l35.41-22.996V53.529zm22.382 30.313 13.015 8.454V61.989l-13.015-8.454zM13.247 83.86l13.788 8.96 13.794-8.96-13.788-8.953zM9.342 37.162V75.26l13.022-8.46V42.392L44.74 27.856v-13.69zm22.364 29.632 13.028 8.46V61.989l-13.028-8.46zm3.898-21.871 13.807 8.965 13.794-8.96-13.8-8.964zm18.478-17.067 13.033 8.466V22.638l-13.033-8.473z"
      />
      <path
        fill="currentColor"
        d="M733.646 27.782v90.93h-14.947v-90.93zM661.919 27.782h16.691l35.375 90.93h-15.944l-8.968-23.667h-38.24l-8.844 23.667h-15.446zm7.971 16.567-14.075 37.617h28.275zM601.622 98.16c-1.993 12.954-12.581 22.047-27.902 22.047-18.186 0-30.891-13.827-30.891-33.757 0-19.431 13.203-34.005 30.891-34.005 18.559 0 28.898 14.325 28.898 32.386 0 1.993-.125 3.363-.498 5.356h-45.589c1.245 12.581 8.594 18.435 17.189 18.435 8.221 0 13.203-4.11 14.947-10.463zm-28.027-34.13c-9.715 0-14.947 6.726-16.566 15.57h31.638c-.124-8.222-5.48-15.57-15.072-15.57M515.655 46.217c0-12.083 7.349-18.435 19.432-18.435h7.224v11.833h-5.854c-4.484 0-6.602 1.993-6.602 6.602v7.723h12.456v11.833h-12.456v52.939h-14.2V65.773h-8.221V53.94h8.221zM483.501 78.354c4.235-.623 6.477-2.616 6.477-6.353 0-4.858-4.235-8.47-11.708-8.47-7.848 0-12.456 3.861-13.204 10.09h-14.324c1.245-11.585 10.961-21.176 27.652-21.176 17.563 0 25.535 8.968 25.535 23.542v29.521c0 4.36.249 8.595.747 13.204h-13.577c-.498-2.491-.747-5.232-.872-7.972-3.612 5.605-11.21 9.467-19.68 9.467-12.207 0-22.67-7.225-22.67-19.557 0-13.079 9.84-18.31 22.794-20.303zm-22.047 21.674c0 6.228 4.733 9.342 11.21 9.342 9.218 0 17.314-5.481 17.314-16.318v-5.605l-15.943 2.616c-7.1 1.245-12.581 3.363-12.581 9.965M371.225 90.312h15.944c1.744 11.709 10.09 16.94 22.546 16.94 11.085 0 19.68-4.858 19.68-13.702 0-7.224-4.11-10.463-13.452-12.331l-18.809-3.862c-12.456-2.49-22.795-8.968-22.795-23.542 0-15.57 13.328-27.528 33.383-27.528 20.801 0 33.756 11.086 35.624 28.65H427.9c-.996-9.094-8.096-15.695-20.427-15.695-10.837 0-18.56 5.73-18.56 13.328 0 6.601 3.737 9.59 12.207 11.335l18.31 3.487c15.072 2.99 24.912 10.713 24.912 25.037 0 17.065-15.694 27.778-34.752 27.778-21.798 0-36.621-10.837-38.365-29.895M369.039 98.16c-1.993 12.954-12.581 22.047-27.902 22.047-18.186 0-30.891-13.827-30.891-33.757 0-19.431 13.204-34.005 30.891-34.005 18.56 0 28.898 14.325 28.898 32.386 0 1.993-.124 3.363-.498 5.356h-45.589c1.245 12.581 8.594 18.435 17.189 18.435 8.221 0 13.204-4.11 14.947-10.463zm-28.026-34.13c-9.716 0-14.948 6.726-16.567 15.57h31.638c-.124-8.222-5.48-15.57-15.071-15.57M243.191 142.379v-88.44h14.449v9.094c3.612-5.855 10.961-10.588 20.054-10.588 17.065 0 28.151 15.196 28.151 33.88s-11.086 33.882-28.151 33.882c-9.093 0-16.442-4.734-20.054-10.588v32.76zm31.015-33.757c10.962 0 17.065-8.968 17.065-22.296s-6.103-22.297-17.065-22.297c-10.836 0-17.189 8.969-17.189 22.297s6.353 22.296 17.189 22.296M213.27 126.435c-3.737 10.089-9.218 15.944-21.798 15.944h-5.979v-11.834h5.605c5.356 0 8.595-1.993 10.09-7.1l.996-3.114-24.289-66.391h15.072l16.192 49.077 15.82-49.077h14.573zM197.867 41.11h-30.019v77.602h-14.947V41.11h-30.019V27.782h74.985z"
      />
    </svg>
  );
}

/**
 * Stacked provider icons for Traditional LLM (OpenAI, Claude, Gemini).
 * OpenAI is positioned on top with the highest z-index.
 */
export function TraditionalLlmIcons() {
  return (
    <div
      className="inline-flex items-center -space-x-1.5 select-none"
      title="OpenAI, Anthropic Claude, Google Gemini"
      aria-label="OpenAI, Claude, and Gemini"
    >
      {/* OpenAI - Topmost layer */}
      <div
        className="relative z-30 flex items-center justify-center w-5 h-5 rounded-full bg-white border border-neutral-200/90 shadow-2xs transition-transform hover:scale-115 hover:z-40 cursor-default"
        title="OpenAI"
      >
        <OpenAIIcon className="w-3 h-3 text-neutral-950" />
      </div>

      {/* Claude - Middle layer */}
      <div
        className="relative z-20 flex items-center justify-center w-5 h-5 rounded-full bg-white border border-neutral-200/90 shadow-2xs transition-transform hover:scale-115 hover:z-40 cursor-default"
        title="Anthropic Claude"
      >
        <ClaudeIcon className="w-3 h-3" />
      </div>

      {/* Gemini - Bottom layer */}
      <div
        className="relative z-10 flex items-center justify-center w-5 h-5 rounded-full bg-white border border-neutral-200/90 shadow-2xs transition-transform hover:scale-115 hover:z-40 cursor-default"
        title="Google Gemini"
      >
        <GeminiIcon className="w-3 h-3" />
      </div>
    </div>
  );
}

/**
 * TypeSafe AI official logo for Jev.
 * Displays the exact official 3D isometric cube mark in a matching circular badge,
 * accompanied by the subtle TypeSafe AI brand label.
 */
export function JevTypeSafeAiLogo() {
  return (
    <div
      className="inline-flex items-center gap-1.5 select-none"
      title="TypeSafe AI"
      aria-label="TypeSafe AI"
    >
      <div
        className="flex items-center justify-center w-5 h-5 rounded-full bg-white border border-neutral-200/90 shadow-2xs transition-transform hover:scale-115 cursor-default"
      >
        <TypesafeAiIcon className="w-2.5 h-3 text-neutral-950" />
      </div>
      <span className="text-[10px] font-semibold tracking-wider text-neutral-500 uppercase">
        TYPESAFE AI
      </span>
    </div>
  );
}
