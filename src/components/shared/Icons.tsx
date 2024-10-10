const Icons = {
  Cart: (props: any) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.5613 4.87359C19.1822 4.41031 18.5924 4.12873 17.9821 4.12873H5.15889L4.75914 2.63901C4.52718 1.77302 3.72769 1.16895 2.80069 1.16895H0.653099C0.295301 1.16895 0 1.45052 0 1.79347C0 2.13562 0.294459 2.418 0.653099 2.418H2.80069C3.11654 2.418 3.39045 2.61936 3.47434 2.92139L6.04306 12.7077C6.27502 13.5737 7.07451 14.1778 8.00152 14.1778H16.4028C17.3289 14.1778 18.1507 13.5737 18.3612 12.7077L19.9405 6.50575C20.0877 5.941 19.9619 5.33693 19.5613 4.87365L19.5613 4.87359ZM18.6566 6.22252L17.0773 12.4245C16.9934 12.7265 16.7195 12.9279 16.4036 12.9279H8.00154C7.68569 12.9279 7.41178 12.7265 7.32789 12.4245L5.49611 5.39756H17.983C18.1936 5.39756 18.4042 5.49824 18.5308 5.65948C18.6567 5.81994 18.7192 6.0213 18.6567 6.22266L18.6566 6.22252Z"
        fill="currentColor"
      />
      <path
        d="M8.44437 14.9814C7.2443 14.9814 6.25488 15.9276 6.25488 17.0751C6.25488 18.2226 7.24439 19.1688 8.44437 19.1688C9.64445 19.1696 10.6339 18.2234 10.6339 17.0757C10.6339 15.928 9.64436 14.9812 8.44437 14.9812V14.9814ZM8.44437 17.9011C7.9599 17.9011 7.58071 17.5385 7.58071 17.0752C7.58071 16.6119 7.9599 16.2493 8.44437 16.2493C8.92885 16.2493 9.30804 16.6119 9.30804 17.0752C9.30722 17.5188 8.90748 17.9011 8.44437 17.9011Z"
        fill="currentColor"
      />
      <path
        d="M15.6875 14.9814C14.4875 14.9814 13.498 15.9277 13.498 17.0752C13.498 18.2226 14.4876 19.1689 15.6875 19.1689C16.8875 19.1689 17.877 18.2226 17.877 17.0752C17.8565 15.9284 16.8875 14.9814 15.6875 14.9814ZM15.6875 17.9011C15.2031 17.9011 14.8239 17.5385 14.8239 17.0752C14.8239 16.612 15.2031 16.2493 15.6875 16.2493C16.172 16.2493 16.5512 16.612 16.5512 17.0752C16.5512 17.5188 16.1506 17.9011 15.6875 17.9011Z"
        fill="currentColor"
      />
    </svg>
  ),
  Plus: (props: any) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_92234_46)">
        <path
          d="M12 8V16"
          stroke="#1D1F22"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 12H16"
          stroke="#1D1F22"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="0.5" y="0.5" width="23" height="23" stroke="#1D1F22" />
      </g>
      <defs>
        <clipPath id="clip0_92234_46">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  Minus: (props: any) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="23" height="23" stroke="#1D1F22" />
      <path
        d="M8 12H16"
        stroke="#1D1F22"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Alert: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M2.20164 18.4695L10.1643 4.00506C10.9021 2.66498 13.0979 2.66498 13.8357 4.00506L21.7984 18.4695C22.4443 19.6428 21.4598 21 19.9627 21H4.0373C2.54022 21 1.55571 19.6428 2.20164 18.4695Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 9V13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 17.0195V17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  RightChevron: (props: any) => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        width="32"
        height="32"
        transform="matrix(-1 0 0 1 32 0)"
        fill="black"
        fillOpacity="0.73"
      />
      <path
        d="M13 8.09158L20.5 15.5836L13 23.0757"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  LeftChevron: (props: any) => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        width="31.6978"
        height="31.6978"
        transform="matrix(0.999953 0.00966993 -0.00948818 0.999955 0.300781 0)"
        fill="black"
        fillOpacity="0.73"
      />
      <path
        d="M18.9687 8.16618L11.5396 15.5875L18.9687 23.0088"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export default Icons;
