<template>
  <v-container fluid class="common-bg-container d-flex">
    <slot></slot>
  </v-container>
</template>

<script>
export default {
  name: 'PlainLayout',
};
</script>

<style lang="scss" scoped>
.common-bg-container {
  display: flex;
  justify-content: center;
  align-items: center;
  // background-image: url('../../assets/food-bg.jpg');
  background-image: linear-gradient(to bottom right, #de6262, #ffb88c);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  //test
  // background: #C04848;  /* fallback for old browsers */
  //   background: linear-gradient(rgb(72,0,72,0.8), rgb(192,72,72,0.8)), url("https://ik.imagekit.io/ikmedia/blog/hero-image.jpeg");  /* Chrome 10-25, Safari 5.1-6 */
  //   background: linear-gradient(rgb(72,0,72,0.8), rgb(192,72,72,0.8)), url("https://ik.imagekit.io/ikmedia/blog/hero-image.jpeg"); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  //   background-size: cover;
  //   background-repeat: no-repeat;
  min-height: 100vh;
  height: 100%;
}

.common-bg-container::before {
  content: "";
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.2);
}

// .common-background {
//   min-height: 100vh;
//   padding: 0px;

//   .left-section-wrap {
//     width: 60%;
//     background-color: #19397d;
//     color: #fff;

//     .left-content {
//       width: 100%;
//       max-width: 800px;

//       .left-title {
//         font-size: 2.3rem;
//         font-weight: 700;
//       }

//       .left-desc {
//         font-size: 1rem;
//       }

//       .left-dots {
//         .dots {
//           width: 10px;
//           height: 10px;
//           background-color: #fff;
//           border-radius: 50%;
//           margin-right: 8px;

//           &:nth-child(1n + 2) {
//             background-color: #5e74a4;
//           }
//         }
//       }

//       .left-desc {
//         width: 450px;
//       }
//     }

//     .left-picture {
//       width: 70%;
//     }
//   }

//   .right-section-wrap {
//     width: 40%;
//     // flex-basis: 400px;
//     z-index: 1;
//     position: relative;

//     .login-logo {
//       .login-title {
//         color: var(--blue);
//         font-size: 36px;
//         font-weight: 800;
//       }
//     }

//     .login-desc {
//       font-size: 20px;
//       font-weight: 800;
//       color: var(--grey-less-dark);
//     }

//     .power-by-section {
//       font-family: 'Roboto', sans-serif;
//       position: absolute;
//       bottom: 20px;
//       font-size: 0.9rem;
//       color: #19397d;

//       p {
//         font-family: inherit;
//         span {
//           font-size: 1rem;
//         }
//       }
//     }
//   }
// }

// @media only screen and (max-width: 1263px) {
//   .common-background {
//     .left-section-wrap {
//       width: 55%;
//     }

//     .right-section-wrap {
//       width: 45%;
//     }
//   }
// }

// @media only screen and (max-width: 959px) {
//   .common-background {
//     .right-section-wrap {
//       width: 100%;

//       .power-by-section {
//         bottom: 0px;

//         p {
//           margin-bottom: 8px;
//         }
//       }
//     }
//   }
// }
// // .common-bg-container::before {
// //  content: '';
// //   position: absolute;
// //   left: 0;
// //   top: 0;
// //   width: 100%;
// //   height: 100%;
// //   opacity: 1;
// //   background-color: rgba(255,255,255,0.1);
// // }

// // .common-bg-container::after {
// //   content: '';
// //   position: absolute;
// //   left: 0;
// //   top: 0;
// //   width: 100%;
// //   height: 100%;
// //   opacity: 1;
// //   background-color: rgba(30, 41, 62,0.8);
// // }
</style>

