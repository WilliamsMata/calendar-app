export const CheckingAuthSpinner = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="inline-block h-16 w-16 animate-spin" role="status">
        <svg
          fill="#02b9fc"
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              class="fil0"
              d="M854.569 841.338c-188.268 189.444 -519.825 171.223 -704.157 -13.109 -190.56 -190.56 -200.048 -493.728 -28.483 -695.516 10.739 -12.623 21.132 -25.234 34.585 -33.667 36.553 -22.89 85.347 -18.445 117.138 13.347 30.228 30.228 35.737 75.83 16.531 111.665 -4.893 9.117 -9.221 14.693 -16.299 22.289 -140.375 150.709 -144.886 378.867 -7.747 516.005 152.583 152.584 406.604 120.623 541.406 -34.133 106.781 -122.634 142.717 -297.392 77.857 -451.04 -83.615 -198.07 -305.207 -291.19 -510.476 -222.476l-.226 -.226c235.803 -82.501 492.218 23.489 588.42 251.384 70.374 166.699 36.667 355.204 -71.697 493.53 -11.48 14.653 -23.724 28.744 -36.852 41.948z"
            ></path>
          </g>
        </svg>
      </div>
    </div>
  );
};
