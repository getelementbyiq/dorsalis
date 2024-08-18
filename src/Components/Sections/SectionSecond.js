import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import "./style.css";

const SectionSecond = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        height: "100vh",
        // background: "red",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "#fff",
      }}
    >
      <svg
        width="152"
        height="24"
        viewBox="0 0 152 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.928 18V5.4H3.424V8.472L2.776 8.568C2.904 8.184 3.128 7.792 3.448 7.392C3.768 6.992 4.168 6.632 4.648 6.312C5.128 5.976 5.656 5.704 6.232 5.496C6.824 5.288 7.456 5.184 8.128 5.184C8.912 5.184 9.616 5.312 10.24 5.568C10.864 5.824 11.368 6.216 11.752 6.744C12.152 7.272 12.416 7.928 12.544 8.712L11.968 8.568L12.136 8.16C12.328 7.824 12.592 7.488 12.928 7.152C13.28 6.8 13.688 6.48 14.152 6.192C14.632 5.888 15.144 5.648 15.688 5.472C16.232 5.28 16.792 5.184 17.368 5.184C18.488 5.184 19.392 5.4 20.08 5.832C20.768 6.264 21.272 6.88 21.592 7.68C21.912 8.48 22.072 9.432 22.072 10.536V18H19.576V10.776C19.576 10.056 19.472 9.456 19.264 8.976C19.072 8.48 18.768 8.104 18.352 7.848C17.936 7.592 17.392 7.464 16.72 7.464C16.16 7.464 15.632 7.56 15.136 7.752C14.656 7.928 14.232 8.184 13.864 8.52C13.496 8.84 13.208 9.216 13 9.648C12.808 10.08 12.712 10.544 12.712 11.04V18H10.216V10.728C10.216 10.056 10.104 9.48 9.88 9C9.656 8.504 9.32 8.128 8.872 7.872C8.424 7.6 7.856 7.464 7.168 7.464C6.624 7.464 6.128 7.56 5.68 7.752C5.232 7.944 4.832 8.2 4.48 8.52C4.144 8.84 3.88 9.2 3.688 9.6C3.512 9.984 3.424 10.384 3.424 10.8V18H0.928ZM33.0411 18.24C31.8091 18.24 30.7131 17.96 29.7531 17.4C28.7931 16.824 28.0331 16.04 27.4731 15.048C26.9291 14.056 26.6571 12.928 26.6571 11.664C26.6571 10.4 26.9371 9.28 27.4971 8.304C28.0731 7.312 28.8571 6.536 29.8491 5.976C30.8411 5.416 31.9691 5.136 33.2331 5.136C34.0011 5.136 34.7051 5.24 35.3451 5.448C36.0011 5.64 36.5691 5.912 37.0491 6.264C37.5291 6.616 37.9131 7.008 38.2011 7.44C38.4891 7.856 38.6491 8.296 38.6811 8.76L38.0811 8.664V5.4H40.5531V18H38.0811V14.808L38.6091 14.784C38.5451 15.184 38.3531 15.592 38.0331 16.008C37.7291 16.408 37.3131 16.776 36.7851 17.112C36.2731 17.448 35.6971 17.72 35.0571 17.928C34.4171 18.136 33.7451 18.24 33.0411 18.24ZM33.6651 15.96C34.5451 15.96 35.3211 15.776 35.9931 15.408C36.6811 15.04 37.2171 14.536 37.6011 13.896C37.9851 13.24 38.1771 12.496 38.1771 11.664C38.1771 10.864 37.9851 10.144 37.6011 9.504C37.2171 8.864 36.6811 8.36 35.9931 7.992C35.3211 7.608 34.5451 7.416 33.6651 7.416C32.7851 7.416 32.0091 7.608 31.3371 7.992C30.6651 8.36 30.1371 8.864 29.7531 9.504C29.3691 10.144 29.1771 10.864 29.1771 11.664C29.1771 12.496 29.3691 13.24 29.7531 13.896C30.1371 14.536 30.6651 15.04 31.3371 15.408C32.0091 15.776 32.7851 15.96 33.6651 15.96ZM48.7476 14.352L48.7956 11.664L55.9476 5.4H59.3316L48.7476 14.352ZM46.6596 18V0.24H49.0356V18H46.6596ZM56.3076 18L50.8356 11.88L52.5396 10.272L59.4756 18H56.3076ZM69.4174 18.24C67.9774 18.24 66.6974 17.968 65.5774 17.424C64.4574 16.864 63.5774 16.104 62.9374 15.144C62.3134 14.184 62.0014 13.08 62.0014 11.832C62.0014 10.808 62.1854 9.888 62.5534 9.072C62.9214 8.256 63.4254 7.552 64.0654 6.96C64.7214 6.368 65.4894 5.912 66.3694 5.592C67.2494 5.272 68.1934 5.112 69.2014 5.112C70.1134 5.112 70.9614 5.264 71.7454 5.568C72.5454 5.872 73.2414 6.296 73.8334 6.84C74.4254 7.384 74.8814 8.032 75.2014 8.784C75.5374 9.52 75.6974 10.336 75.6814 11.232L75.6574 12.384H64.0174L63.4654 10.416H73.5214L73.1614 10.728V10.152C73.0974 9.624 72.8734 9.152 72.4894 8.736C72.1054 8.32 71.6254 7.992 71.0494 7.752C70.4734 7.512 69.8574 7.392 69.2014 7.392C68.2414 7.392 67.4014 7.544 66.6814 7.848C65.9774 8.152 65.4254 8.624 65.0254 9.264C64.6414 9.888 64.4494 10.688 64.4494 11.664C64.4494 12.544 64.6734 13.304 65.1214 13.944C65.5694 14.584 66.1934 15.08 66.9934 15.432C67.7934 15.784 68.7134 15.96 69.7534 15.96C70.6494 15.96 71.4254 15.832 72.0814 15.576C72.7374 15.32 73.3614 14.968 73.9534 14.52L75.1294 16.32C74.7134 16.672 74.1934 17 73.5694 17.304C72.9454 17.592 72.2734 17.824 71.5534 18C70.8494 18.16 70.1374 18.24 69.4174 18.24ZM91.5439 23.52L94.4239 17.64L94.4479 19.584L87.4639 5.4H90.3439L94.2079 13.704C94.4959 14.248 94.7519 14.784 94.9759 15.312C95.1999 15.824 95.3599 16.304 95.4559 16.752L94.9519 16.848C95.1279 16.4 95.3279 15.904 95.5519 15.36C95.7759 14.816 96.0239 14.232 96.2959 13.608L99.7279 5.4H102.632L96.6799 18.048L94.1839 23.52H91.5439ZM112.54 18.24C111.148 18.24 109.908 17.96 108.82 17.4C107.748 16.824 106.9 16.048 106.276 15.072C105.652 14.08 105.34 12.952 105.34 11.688C105.34 10.424 105.652 9.304 106.276 8.328C106.9 7.336 107.748 6.56 108.82 6C109.908 5.424 111.148 5.136 112.54 5.136C113.916 5.136 115.14 5.424 116.212 6C117.3 6.56 118.156 7.336 118.78 8.328C119.404 9.304 119.716 10.424 119.716 11.688C119.716 12.952 119.404 14.08 118.78 15.072C118.156 16.048 117.3 16.824 116.212 17.4C115.14 17.96 113.916 18.24 112.54 18.24ZM112.54 15.984C113.42 15.984 114.212 15.8 114.916 15.432C115.636 15.048 116.196 14.536 116.596 13.896C117.012 13.24 117.212 12.504 117.196 11.688C117.212 10.856 117.012 10.12 116.596 9.48C116.196 8.824 115.636 8.312 114.916 7.944C114.212 7.576 113.42 7.392 112.54 7.392C111.66 7.392 110.86 7.584 110.14 7.968C109.42 8.336 108.852 8.84 108.436 9.48C108.036 10.12 107.844 10.856 107.86 11.688C107.844 12.504 108.036 13.24 108.436 13.896C108.852 14.536 109.42 15.048 110.14 15.432C110.86 15.8 111.66 15.984 112.54 15.984ZM129.387 18.24C128.411 18.24 127.555 18.016 126.819 17.568C126.083 17.104 125.507 16.456 125.091 15.624C124.691 14.776 124.491 13.768 124.491 12.6V5.4H126.963V11.832C126.963 12.712 127.091 13.464 127.347 14.088C127.603 14.696 127.987 15.16 128.499 15.48C129.011 15.8 129.643 15.96 130.395 15.96C130.939 15.96 131.443 15.872 131.907 15.696C132.371 15.52 132.771 15.272 133.107 14.952C133.459 14.632 133.731 14.248 133.923 13.8C134.131 13.352 134.235 12.856 134.235 12.312V5.4H136.707V18H134.235V15.36L134.667 15.072C134.475 15.616 134.131 16.136 133.635 16.632C133.139 17.112 132.531 17.504 131.811 17.808C131.091 18.096 130.283 18.24 129.387 18.24ZM142.8 18V5.4H145.296V9.6L144.864 8.976C145.072 8.272 145.424 7.632 145.92 7.056C146.416 6.464 146.984 6 147.624 5.664C148.264 5.312 148.928 5.136 149.616 5.136C150.016 5.136 150.4 5.176 150.768 5.256C151.152 5.336 151.448 5.44 151.656 5.568L151.008 8.208C150.752 8.064 150.448 7.952 150.096 7.872C149.76 7.792 149.432 7.752 149.112 7.752C148.568 7.752 148.064 7.856 147.6 8.064C147.136 8.256 146.728 8.52 146.376 8.856C146.04 9.192 145.776 9.576 145.584 10.008C145.392 10.424 145.296 10.864 145.296 11.328V18H142.8Z"
          fill="url(#paint0_linear_25_2079)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_25_2079"
            x1="-2"
            y1="9"
            x2="153"
            y2="9"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#32DAFF" />
            <stop offset="1" stop-color="#B01FF4" />
          </linearGradient>
        </defs>
      </svg>

      <Typography
        sx={{
          fontSize: "64px",
          mb: "8px",
        }}
      >
        Research
      </Typography>
      <svg
        width="110"
        height="32"
        viewBox="0 0 110 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.24 22.4C10.84 22.4 8.70667 21.9467 6.84 21.04C4.97333 20.1067 3.50667 18.84 2.44 17.24C1.4 15.64 0.88 13.8 0.88 11.72C0.88 10.0133 1.18667 8.48 1.8 7.12C2.41333 5.76 3.25333 4.58667 4.32 3.6C5.41333 2.61333 6.69333 1.85333 8.16 1.32C9.62667 0.786666 11.2 0.52 12.88 0.52C14.4 0.52 15.8133 0.773333 17.12 1.28C18.4533 1.78667 19.6133 2.49333 20.6 3.4C21.5867 4.30667 22.3467 5.38667 22.88 6.64C23.44 7.86667 23.7067 9.22667 23.68 10.72L23.64 12.64H4.24L3.32 9.36H20.08L19.48 9.88V8.92C19.3733 8.04 19 7.25333 18.36 6.56C17.72 5.86667 16.92 5.32 15.96 4.92C15 4.52 13.9733 4.32 12.88 4.32C11.28 4.32 9.88 4.57333 8.68 5.08C7.50667 5.58667 6.58667 6.37333 5.92 7.44C5.28 8.48 4.96 9.81333 4.96 11.44C4.96 12.9067 5.33333 14.1733 6.08 15.24C6.82667 16.3067 7.86667 17.1333 9.2 17.72C10.5333 18.3067 12.0667 18.6 13.8 18.6C15.2933 18.6 16.5867 18.3867 17.68 17.96C18.7733 17.5333 19.8133 16.9467 20.8 16.2L22.76 19.2C22.0667 19.7867 21.2 20.3333 20.16 20.84C19.12 21.32 18 21.7067 16.8 22C15.6267 22.2667 14.44 22.4 13.24 22.4ZM40.4253 22.4C38.372 22.4 36.5453 21.9333 34.9453 21C33.3453 20.04 32.0786 18.7333 31.1453 17.08C30.2386 15.4267 29.7853 13.5467 29.7853 11.44C29.7853 9.33333 30.252 7.46667 31.1853 5.84C32.1453 4.18667 33.452 2.89333 35.1053 1.96C36.7586 1.02667 38.6386 0.559999 40.7453 0.559999C42.0253 0.559999 43.1986 0.733333 44.2653 1.08C45.3586 1.4 46.3053 1.85333 47.1053 2.44C47.9053 3.02667 48.5453 3.68 49.0253 4.4C49.5053 5.09333 49.772 5.82667 49.8253 6.6L48.8253 6.44V0.999999H52.9453V22H48.8253V16.68L49.7053 16.64C49.5986 17.3067 49.2786 17.9867 48.7453 18.68C48.2386 19.3467 47.5453 19.96 46.6653 20.52C45.812 21.08 44.852 21.5333 43.7853 21.88C42.7186 22.2267 41.5986 22.4 40.4253 22.4ZM41.4653 18.6C42.932 18.6 44.2253 18.2933 45.3453 17.68C46.492 17.0667 47.3853 16.2267 48.0253 15.16C48.6653 14.0667 48.9853 12.8267 48.9853 11.44C48.9853 10.1067 48.6653 8.90667 48.0253 7.84C47.3853 6.77333 46.492 5.93333 45.3453 5.32C44.2253 4.68 42.932 4.36 41.4653 4.36C39.9986 4.36 38.7053 4.68 37.5853 5.32C36.4653 5.93333 35.5853 6.77333 34.9453 7.84C34.3053 8.90667 33.9853 10.1067 33.9853 11.44C33.9853 12.8267 34.3053 14.0667 34.9453 15.16C35.5853 16.2267 36.4653 17.0667 37.5853 17.68C38.7053 18.2933 39.9986 18.6 41.4653 18.6ZM70.4828 22.4C68.4561 22.4 66.6028 22.0933 64.9228 21.48C63.2695 20.8667 61.8828 19.9067 60.7628 18.6L63.5628 16.12C64.4695 17.08 65.4961 17.8 66.6428 18.28C67.8161 18.76 69.1095 19 70.5228 19C71.0828 19 71.6428 18.9467 72.2028 18.84C72.7628 18.7333 73.2695 18.5733 73.7228 18.36C74.1761 18.1467 74.5361 17.8667 74.8028 17.52C75.0695 17.1733 75.2028 16.7733 75.2028 16.32C75.2028 15.5467 74.7495 14.9467 73.8428 14.52C73.3628 14.3333 72.7761 14.1333 72.0828 13.92C71.3895 13.7067 70.5761 13.5067 69.6428 13.32C68.0695 12.9733 66.7095 12.5867 65.5628 12.16C64.4161 11.7067 63.4961 11.16 62.8028 10.52C62.2961 10.0133 61.9095 9.44 61.6428 8.8C61.4028 8.16 61.2828 7.42667 61.2828 6.6C61.2828 5.72 61.4961 4.90667 61.9228 4.16C62.3761 3.41333 63.0028 2.77333 63.8028 2.24C64.6028 1.70667 65.5361 1.29333 66.6028 0.999999C67.6695 0.706666 68.8161 0.559999 70.0428 0.559999C71.1361 0.559999 72.2428 0.693333 73.3628 0.959999C74.5095 1.2 75.5761 1.57333 76.5628 2.08C77.5761 2.56 78.4161 3.17333 79.0828 3.92L76.8028 6.6C76.1895 6.09333 75.4961 5.64 74.7228 5.24C73.9761 4.84 73.2028 4.53333 72.4028 4.32C71.6028 4.08 70.8561 3.96 70.1628 3.96C69.5761 3.96 68.9895 4.01333 68.4028 4.12C67.8161 4.2 67.2961 4.34667 66.8428 4.56C66.4161 4.74667 66.0695 5 65.8028 5.32C65.5361 5.64 65.4028 6.02667 65.4028 6.48C65.4028 6.82667 65.4828 7.14667 65.6428 7.44C65.8295 7.70667 66.0695 7.94667 66.3628 8.16C66.8161 8.45333 67.4295 8.72 68.2028 8.96C68.9761 9.2 69.8961 9.42667 70.9628 9.64C72.3495 9.93333 73.5761 10.28 74.6428 10.68C75.7361 11.0533 76.6428 11.52 77.3628 12.08C77.9761 12.5333 78.4295 13.08 78.7228 13.72C79.0428 14.36 79.2028 15.0933 79.2028 15.92C79.2028 17.2267 78.8028 18.3733 78.0028 19.36C77.2295 20.32 76.1895 21.0667 74.8828 21.6C73.5761 22.1333 72.1095 22.4 70.4828 22.4ZM90.8206 31.2L95.6206 21.4L95.6606 24.64L84.0206 0.999999H88.8206L95.2606 14.84C95.7406 15.7467 96.1673 16.64 96.5406 17.52C96.914 18.3733 97.1806 19.1733 97.3406 19.92L96.5006 20.08C96.794 19.3333 97.1273 18.5067 97.5006 17.6C97.874 16.6933 98.2873 15.72 98.7406 14.68L104.461 0.999999H109.301L99.3806 22.08L95.2206 31.2H90.8206Z"
          fill="url(#paint0_linear_690_454)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_690_454"
            x1="-2"
            y1="7"
            x2="112"
            y2="7"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#32DAFF" />
            <stop offset="1" stop-color="#B01FF4" />
          </linearGradient>
        </defs>
      </svg>
    </Box>
  );
};

SectionSecond.propTypes = {};

export default SectionSecond;