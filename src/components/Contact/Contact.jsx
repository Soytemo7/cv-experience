import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "devicon/devicon.min.css";
import "../../styles/Contact/contact.css";
import "../../styles/Contact/contact-tech-marquee.css";

const FORM_ENDPOINT = "https://formsubmit.co/ajax/manuel_fusion@hotmail.com";

const technologies = [
  { name: "React", icon: "devicon-react-original colored" },
  { name: "JavaScript", icon: "devicon-javascript-plain colored" },
  { name: "HTML5", icon: "devicon-html5-plain colored" },
  { name: "CSS3", icon: "devicon-css3-plain colored" },
  { name: "Node.js", icon: "devicon-nodejs-plain colored" },
  { name: "Express", icon: "devicon-express-original" },
  { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
  { name: "Firebase", icon: "devicon-firebase-plain colored" },
  { name: "Git", icon: "devicon-git-plain colored" },
  { name: "GitHub", icon: "devicon-github-original" },
  { name: "Vite", icon: "devicon-vitejs-plain colored" },
  { name: "NPM", icon: "devicon-npm-original-wordmark colored" },
  { name: "Bootstrap", icon: "devicon-bootstrap-plain colored" },
  { name: "Ant Design", icon: "devicon-antdesign-plain colored" }
];

const particleSeed = [
  { id: 1, x: 0, y: 0, size: 1.0, delay: 0.00, duration: 8 },
  { id: 2, x: 37, y: 61, size: 1.7, delay: 0.43, duration: 9 },
  { id: 3, x: 74, y: 22, size: 2.4, delay: 0.86, duration: 10 },
  { id: 4, x: 11, y: 83, size: 3.1, delay: 1.29, duration: 11 },
  { id: 5, x: 48, y: 44, size: 1.0, delay: 1.72, duration: 12 },
  { id: 6, x: 85, y: 5, size: 1.7, delay: 2.15, duration: 13 },
  { id: 7, x: 22, y: 66, size: 2.4, delay: 2.58, duration: 14 },
  { id: 8, x: 59, y: 27, size: 3.1, delay: 3.01, duration: 15 },
  { id: 9, x: 96, y: 88, size: 1.0, delay: 3.44, duration: 16 },
  { id: 10, x: 33, y: 49, size: 1.7, delay: 3.87, duration: 17 },
  { id: 11, x: 70, y: 10, size: 2.4, delay: 4.30, duration: 18 },
  { id: 12, x: 7, y: 71, size: 3.1, delay: 0.00, duration: 19 },
  { id: 13, x: 44, y: 32, size: 1.0, delay: 0.43, duration: 20 },
  { id: 14, x: 81, y: 93, size: 1.7, delay: 0.86, duration: 21 },
  { id: 15, x: 18, y: 54, size: 2.4, delay: 1.29, duration: 22 },
  { id: 16, x: 55, y: 15, size: 3.1, delay: 1.72, duration: 23 },
  { id: 17, x: 92, y: 76, size: 1.0, delay: 2.15, duration: 24 },
  { id: 18, x: 29, y: 37, size: 1.7, delay: 2.58, duration: 8 },
  { id: 19, x: 66, y: 98, size: 2.4, delay: 3.01, duration: 9 },
  { id: 20, x: 3, y: 59, size: 3.1, delay: 3.44, duration: 10 },
  { id: 21, x: 40, y: 20, size: 1.0, delay: 3.87, duration: 11 },
  { id: 22, x: 77, y: 81, size: 1.7, delay: 4.30, duration: 12 },
  { id: 23, x: 14, y: 42, size: 2.4, delay: 0.00, duration: 13 },
  { id: 24, x: 51, y: 3, size: 3.1, delay: 0.43, duration: 14 },
  { id: 25, x: 88, y: 64, size: 1.0, delay: 0.86, duration: 15 },
  { id: 26, x: 25, y: 25, size: 1.7, delay: 1.29, duration: 16 },
  { id: 27, x: 62, y: 86, size: 2.4, delay: 1.72, duration: 17 },
  { id: 28, x: 99, y: 47, size: 3.1, delay: 2.15, duration: 18 },
  { id: 29, x: 36, y: 8, size: 1.0, delay: 2.58, duration: 19 },
  { id: 30, x: 73, y: 69, size: 1.7, delay: 3.01, duration: 20 },
  { id: 31, x: 10, y: 30, size: 2.4, delay: 3.44, duration: 21 },
  { id: 32, x: 47, y: 91, size: 3.1, delay: 3.87, duration: 22 },
  { id: 33, x: 84, y: 52, size: 1.0, delay: 4.30, duration: 23 },
  { id: 34, x: 21, y: 13, size: 1.7, delay: 0.00, duration: 24 },
  { id: 35, x: 58, y: 74, size: 2.4, delay: 0.43, duration: 8 },
  { id: 36, x: 95, y: 35, size: 3.1, delay: 0.86, duration: 9 },
  { id: 37, x: 32, y: 96, size: 1.0, delay: 1.29, duration: 10 },
  { id: 38, x: 69, y: 57, size: 1.7, delay: 1.72, duration: 11 },
  { id: 39, x: 6, y: 18, size: 2.4, delay: 2.15, duration: 12 },
  { id: 40, x: 43, y: 79, size: 3.1, delay: 2.58, duration: 13 },
  { id: 41, x: 80, y: 40, size: 1.0, delay: 3.01, duration: 14 },
  { id: 42, x: 17, y: 1, size: 1.7, delay: 3.44, duration: 15 },
  { id: 43, x: 54, y: 62, size: 2.4, delay: 3.87, duration: 16 },
  { id: 44, x: 91, y: 23, size: 3.1, delay: 4.30, duration: 17 },
  { id: 45, x: 28, y: 84, size: 1.0, delay: 0.00, duration: 18 },
  { id: 46, x: 65, y: 45, size: 1.7, delay: 0.43, duration: 19 },
  { id: 47, x: 2, y: 6, size: 2.4, delay: 0.86, duration: 20 },
  { id: 48, x: 39, y: 67, size: 3.1, delay: 1.29, duration: 21 },
  { id: 49, x: 76, y: 28, size: 1.0, delay: 1.72, duration: 22 },
  { id: 50, x: 13, y: 89, size: 1.7, delay: 2.15, duration: 23 },
  { id: 51, x: 50, y: 50, size: 2.4, delay: 2.58, duration: 24 },
  { id: 52, x: 87, y: 11, size: 3.1, delay: 3.01, duration: 8 },
  { id: 53, x: 24, y: 72, size: 1.0, delay: 3.44, duration: 9 },
  { id: 54, x: 61, y: 33, size: 1.7, delay: 3.87, duration: 10 },
  { id: 55, x: 98, y: 94, size: 2.4, delay: 4.30, duration: 11 },
  { id: 56, x: 35, y: 55, size: 3.1, delay: 0.00, duration: 12 },
  { id: 57, x: 72, y: 16, size: 1.0, delay: 0.43, duration: 13 },
  { id: 58, x: 9, y: 77, size: 1.7, delay: 0.86, duration: 14 },
  { id: 59, x: 46, y: 38, size: 2.4, delay: 1.29, duration: 15 },
  { id: 60, x: 83, y: 99, size: 3.1, delay: 1.72, duration: 16 },
  { id: 61, x: 20, y: 60, size: 1.0, delay: 2.15, duration: 17 },
  { id: 62, x: 57, y: 21, size: 1.7, delay: 2.58, duration: 18 },
  { id: 63, x: 94, y: 82, size: 2.4, delay: 3.01, duration: 19 },
  { id: 64, x: 31, y: 43, size: 3.1, delay: 3.44, duration: 20 },
  { id: 65, x: 68, y: 4, size: 1.0, delay: 3.87, duration: 21 },
  { id: 66, x: 5, y: 65, size: 1.7, delay: 4.30, duration: 22 },
  { id: 67, x: 42, y: 26, size: 2.4, delay: 0.00, duration: 23 },
  { id: 68, x: 79, y: 87, size: 3.1, delay: 0.43, duration: 24 },
  { id: 69, x: 16, y: 48, size: 1.0, delay: 0.86, duration: 8 },
  { id: 70, x: 53, y: 9, size: 1.7, delay: 1.29, duration: 9 },
  { id: 71, x: 90, y: 70, size: 2.4, delay: 1.72, duration: 10 },
  { id: 72, x: 27, y: 31, size: 3.1, delay: 2.15, duration: 11 },
  { id: 73, x: 64, y: 92, size: 1.0, delay: 2.58, duration: 12 },
  { id: 74, x: 1, y: 53, size: 1.7, delay: 3.01, duration: 13 },
  { id: 75, x: 38, y: 14, size: 2.4, delay: 3.44, duration: 14 },
  { id: 76, x: 75, y: 75, size: 3.1, delay: 3.87, duration: 15 },
  { id: 77, x: 12, y: 36, size: 1.0, delay: 4.30, duration: 16 },
  { id: 78, x: 49, y: 97, size: 1.7, delay: 0.00, duration: 17 },
  { id: 79, x: 86, y: 58, size: 2.4, delay: 0.43, duration: 18 },
  { id: 80, x: 23, y: 19, size: 3.1, delay: 0.86, duration: 19 },
  { id: 81, x: 60, y: 80, size: 1.0, delay: 1.29, duration: 20 },
  { id: 82, x: 97, y: 41, size: 1.7, delay: 1.72, duration: 21 },
  { id: 83, x: 34, y: 2, size: 2.4, delay: 2.15, duration: 22 },
  { id: 84, x: 71, y: 63, size: 3.1, delay: 2.58, duration: 23 },
  { id: 85, x: 8, y: 24, size: 1.0, delay: 3.01, duration: 24 },
  { id: 86, x: 45, y: 85, size: 1.7, delay: 3.44, duration: 8 },
  { id: 87, x: 82, y: 46, size: 2.4, delay: 3.87, duration: 9 },
  { id: 88, x: 19, y: 7, size: 3.1, delay: 4.30, duration: 10 },
  { id: 89, x: 56, y: 68, size: 1.0, delay: 0.00, duration: 11 },
  { id: 90, x: 93, y: 29, size: 1.7, delay: 0.43, duration: 12 },
  { id: 91, x: 30, y: 90, size: 2.4, delay: 0.86, duration: 13 },
  { id: 92, x: 67, y: 51, size: 3.1, delay: 1.29, duration: 14 },
  { id: 93, x: 4, y: 12, size: 1.0, delay: 1.72, duration: 15 },
  { id: 94, x: 41, y: 73, size: 1.7, delay: 2.15, duration: 16 },
  { id: 95, x: 78, y: 34, size: 2.4, delay: 2.58, duration: 17 },
  { id: 96, x: 15, y: 95, size: 3.1, delay: 3.01, duration: 18 },
  { id: 97, x: 52, y: 56, size: 1.0, delay: 3.44, duration: 19 },
  { id: 98, x: 89, y: 17, size: 1.7, delay: 3.87, duration: 20 },
  { id: 99, x: 26, y: 78, size: 2.4, delay: 4.30, duration: 21 },
  { id: 100, x: 63, y: 39, size: 3.1, delay: 0.00, duration: 22 },
  { id: 101, x: 0, y: 0, size: 1.0, delay: 0.43, duration: 23 },
  { id: 102, x: 37, y: 61, size: 1.7, delay: 0.86, duration: 24 },
  { id: 103, x: 74, y: 22, size: 2.4, delay: 1.29, duration: 8 },
  { id: 104, x: 11, y: 83, size: 3.1, delay: 1.72, duration: 9 },
  { id: 105, x: 48, y: 44, size: 1.0, delay: 2.15, duration: 10 },
  { id: 106, x: 85, y: 5, size: 1.7, delay: 2.58, duration: 11 },
  { id: 107, x: 22, y: 66, size: 2.4, delay: 3.01, duration: 12 },
  { id: 108, x: 59, y: 27, size: 3.1, delay: 3.44, duration: 13 },
  { id: 109, x: 96, y: 88, size: 1.0, delay: 3.87, duration: 14 },
  { id: 110, x: 33, y: 49, size: 1.7, delay: 4.30, duration: 15 },
  { id: 111, x: 70, y: 10, size: 2.4, delay: 0.00, duration: 16 },
  { id: 112, x: 7, y: 71, size: 3.1, delay: 0.43, duration: 17 },
  { id: 113, x: 44, y: 32, size: 1.0, delay: 0.86, duration: 18 },
  { id: 114, x: 81, y: 93, size: 1.7, delay: 1.29, duration: 19 },
  { id: 115, x: 18, y: 54, size: 2.4, delay: 1.72, duration: 20 },
  { id: 116, x: 55, y: 15, size: 3.1, delay: 2.15, duration: 21 },
  { id: 117, x: 92, y: 76, size: 1.0, delay: 2.58, duration: 22 },
  { id: 118, x: 29, y: 37, size: 1.7, delay: 3.01, duration: 23 },
  { id: 119, x: 66, y: 98, size: 2.4, delay: 3.44, duration: 24 },
  { id: 120, x: 3, y: 59, size: 3.1, delay: 3.87, duration: 8 },
  { id: 121, x: 40, y: 20, size: 1.0, delay: 4.30, duration: 9 },
  { id: 122, x: 77, y: 81, size: 1.7, delay: 0.00, duration: 10 },
  { id: 123, x: 14, y: 42, size: 2.4, delay: 0.43, duration: 11 },
  { id: 124, x: 51, y: 3, size: 3.1, delay: 0.86, duration: 12 },
  { id: 125, x: 88, y: 64, size: 1.0, delay: 1.29, duration: 13 },
  { id: 126, x: 25, y: 25, size: 1.7, delay: 1.72, duration: 14 },
  { id: 127, x: 62, y: 86, size: 2.4, delay: 2.15, duration: 15 },
  { id: 128, x: 99, y: 47, size: 3.1, delay: 2.58, duration: 16 },
  { id: 129, x: 36, y: 8, size: 1.0, delay: 3.01, duration: 17 },
  { id: 130, x: 73, y: 69, size: 1.7, delay: 3.44, duration: 18 },
  { id: 131, x: 10, y: 30, size: 2.4, delay: 3.87, duration: 19 },
  { id: 132, x: 47, y: 91, size: 3.1, delay: 4.30, duration: 20 },
  { id: 133, x: 84, y: 52, size: 1.0, delay: 0.00, duration: 21 },
  { id: 134, x: 21, y: 13, size: 1.7, delay: 0.43, duration: 22 },
  { id: 135, x: 58, y: 74, size: 2.4, delay: 0.86, duration: 23 },
  { id: 136, x: 95, y: 35, size: 3.1, delay: 1.29, duration: 24 },
  { id: 137, x: 32, y: 96, size: 1.0, delay: 1.72, duration: 8 },
  { id: 138, x: 69, y: 57, size: 1.7, delay: 2.15, duration: 9 },
  { id: 139, x: 6, y: 18, size: 2.4, delay: 2.58, duration: 10 },
  { id: 140, x: 43, y: 79, size: 3.1, delay: 3.01, duration: 11 },
  { id: 141, x: 80, y: 40, size: 1.0, delay: 3.44, duration: 12 },
  { id: 142, x: 17, y: 1, size: 1.7, delay: 3.87, duration: 13 },
  { id: 143, x: 54, y: 62, size: 2.4, delay: 4.30, duration: 14 },
  { id: 144, x: 91, y: 23, size: 3.1, delay: 0.00, duration: 15 },
  { id: 145, x: 28, y: 84, size: 1.0, delay: 0.43, duration: 16 },
  { id: 146, x: 65, y: 45, size: 1.7, delay: 0.86, duration: 17 },
  { id: 147, x: 2, y: 6, size: 2.4, delay: 1.29, duration: 18 },
  { id: 148, x: 39, y: 67, size: 3.1, delay: 1.72, duration: 19 },
  { id: 149, x: 76, y: 28, size: 1.0, delay: 2.15, duration: 20 },
  { id: 150, x: 13, y: 89, size: 1.7, delay: 2.58, duration: 21 },
  { id: 151, x: 50, y: 50, size: 2.4, delay: 3.01, duration: 22 },
  { id: 152, x: 87, y: 11, size: 3.1, delay: 3.44, duration: 23 },
  { id: 153, x: 24, y: 72, size: 1.0, delay: 3.87, duration: 24 },
  { id: 154, x: 61, y: 33, size: 1.7, delay: 4.30, duration: 8 },
  { id: 155, x: 98, y: 94, size: 2.4, delay: 0.00, duration: 9 },
  { id: 156, x: 35, y: 55, size: 3.1, delay: 0.43, duration: 10 },
  { id: 157, x: 72, y: 16, size: 1.0, delay: 0.86, duration: 11 },
  { id: 158, x: 9, y: 77, size: 1.7, delay: 1.29, duration: 12 },
  { id: 159, x: 46, y: 38, size: 2.4, delay: 1.72, duration: 13 },
  { id: 160, x: 83, y: 99, size: 3.1, delay: 2.15, duration: 14 },
  { id: 161, x: 20, y: 60, size: 1.0, delay: 2.58, duration: 15 },
  { id: 162, x: 57, y: 21, size: 1.7, delay: 3.01, duration: 16 },
  { id: 163, x: 94, y: 82, size: 2.4, delay: 3.44, duration: 17 },
  { id: 164, x: 31, y: 43, size: 3.1, delay: 3.87, duration: 18 },
  { id: 165, x: 68, y: 4, size: 1.0, delay: 4.30, duration: 19 },
  { id: 166, x: 5, y: 65, size: 1.7, delay: 0.00, duration: 20 },
  { id: 167, x: 42, y: 26, size: 2.4, delay: 0.43, duration: 21 },
  { id: 168, x: 79, y: 87, size: 3.1, delay: 0.86, duration: 22 },
  { id: 169, x: 16, y: 48, size: 1.0, delay: 1.29, duration: 23 },
  { id: 170, x: 53, y: 9, size: 1.7, delay: 1.72, duration: 24 },
  { id: 171, x: 90, y: 70, size: 2.4, delay: 2.15, duration: 8 },
  { id: 172, x: 27, y: 31, size: 3.1, delay: 2.58, duration: 9 },
  { id: 173, x: 64, y: 92, size: 1.0, delay: 3.01, duration: 10 },
  { id: 174, x: 1, y: 53, size: 1.7, delay: 3.44, duration: 11 },
  { id: 175, x: 38, y: 14, size: 2.4, delay: 3.87, duration: 12 },
  { id: 176, x: 75, y: 75, size: 3.1, delay: 4.30, duration: 13 },
  { id: 177, x: 12, y: 36, size: 1.0, delay: 0.00, duration: 14 },
  { id: 178, x: 49, y: 97, size: 1.7, delay: 0.43, duration: 15 },
  { id: 179, x: 86, y: 58, size: 2.4, delay: 0.86, duration: 16 },
  { id: 180, x: 23, y: 19, size: 3.1, delay: 1.29, duration: 17 },
  { id: 181, x: 60, y: 80, size: 1.0, delay: 1.72, duration: 18 },
  { id: 182, x: 97, y: 41, size: 1.7, delay: 2.15, duration: 19 },
  { id: 183, x: 34, y: 2, size: 2.4, delay: 2.58, duration: 20 },
  { id: 184, x: 71, y: 63, size: 3.1, delay: 3.01, duration: 21 },
  { id: 185, x: 8, y: 24, size: 1.0, delay: 3.44, duration: 22 },
  { id: 186, x: 45, y: 85, size: 1.7, delay: 3.87, duration: 23 },
  { id: 187, x: 82, y: 46, size: 2.4, delay: 4.30, duration: 24 },
  { id: 188, x: 19, y: 7, size: 3.1, delay: 0.00, duration: 8 },
  { id: 189, x: 56, y: 68, size: 1.0, delay: 0.43, duration: 9 },
  { id: 190, x: 93, y: 29, size: 1.7, delay: 0.86, duration: 10 },
  { id: 191, x: 30, y: 90, size: 2.4, delay: 1.29, duration: 11 },
  { id: 192, x: 67, y: 51, size: 3.1, delay: 1.72, duration: 12 },
  { id: 193, x: 4, y: 12, size: 1.0, delay: 2.15, duration: 13 },
  { id: 194, x: 41, y: 73, size: 1.7, delay: 2.58, duration: 14 },
  { id: 195, x: 78, y: 34, size: 2.4, delay: 3.01, duration: 15 },
  { id: 196, x: 15, y: 95, size: 3.1, delay: 3.44, duration: 16 },
  { id: 197, x: 52, y: 56, size: 1.0, delay: 3.87, duration: 17 },
  { id: 198, x: 89, y: 17, size: 1.7, delay: 4.30, duration: 18 },
  { id: 199, x: 26, y: 78, size: 2.4, delay: 0.00, duration: 19 },
  { id: 200, x: 63, y: 39, size: 3.1, delay: 0.43, duration: 20 },
  { id: 201, x: 0, y: 0, size: 1.0, delay: 0.86, duration: 21 },
  { id: 202, x: 37, y: 61, size: 1.7, delay: 1.29, duration: 22 },
  { id: 203, x: 74, y: 22, size: 2.4, delay: 1.72, duration: 23 },
  { id: 204, x: 11, y: 83, size: 3.1, delay: 2.15, duration: 24 },
  { id: 205, x: 48, y: 44, size: 1.0, delay: 2.58, duration: 8 },
  { id: 206, x: 85, y: 5, size: 1.7, delay: 3.01, duration: 9 },
  { id: 207, x: 22, y: 66, size: 2.4, delay: 3.44, duration: 10 },
  { id: 208, x: 59, y: 27, size: 3.1, delay: 3.87, duration: 11 },
  { id: 209, x: 96, y: 88, size: 1.0, delay: 4.30, duration: 12 },
  { id: 210, x: 33, y: 49, size: 1.7, delay: 0.00, duration: 13 },
  { id: 211, x: 70, y: 10, size: 2.4, delay: 0.43, duration: 14 },
  { id: 212, x: 7, y: 71, size: 3.1, delay: 0.86, duration: 15 },
  { id: 213, x: 44, y: 32, size: 1.0, delay: 1.29, duration: 16 },
  { id: 214, x: 81, y: 93, size: 1.7, delay: 1.72, duration: 17 },
  { id: 215, x: 18, y: 54, size: 2.4, delay: 2.15, duration: 18 },
  { id: 216, x: 55, y: 15, size: 3.1, delay: 2.58, duration: 19 },
  { id: 217, x: 92, y: 76, size: 1.0, delay: 3.01, duration: 20 },
  { id: 218, x: 29, y: 37, size: 1.7, delay: 3.44, duration: 21 },
  { id: 219, x: 66, y: 98, size: 2.4, delay: 3.87, duration: 22 },
  { id: 220, x: 3, y: 59, size: 3.1, delay: 4.30, duration: 23 },
  { id: 221, x: 40, y: 20, size: 1.0, delay: 0.00, duration: 24 },
  { id: 222, x: 77, y: 81, size: 1.7, delay: 0.43, duration: 8 },
  { id: 223, x: 14, y: 42, size: 2.4, delay: 0.86, duration: 9 },
  { id: 224, x: 51, y: 3, size: 3.1, delay: 1.29, duration: 10 },
  { id: 225, x: 88, y: 64, size: 1.0, delay: 1.72, duration: 11 },
  { id: 226, x: 25, y: 25, size: 1.7, delay: 2.15, duration: 12 },
  { id: 227, x: 62, y: 86, size: 2.4, delay: 2.58, duration: 13 },
  { id: 228, x: 99, y: 47, size: 3.1, delay: 3.01, duration: 14 },
  { id: 229, x: 36, y: 8, size: 1.0, delay: 3.44, duration: 15 },
  { id: 230, x: 73, y: 69, size: 1.7, delay: 3.87, duration: 16 },
  { id: 231, x: 10, y: 30, size: 2.4, delay: 4.30, duration: 17 },
  { id: 232, x: 47, y: 91, size: 3.1, delay: 0.00, duration: 18 },
  { id: 233, x: 84, y: 52, size: 1.0, delay: 0.43, duration: 19 },
  { id: 234, x: 21, y: 13, size: 1.7, delay: 0.86, duration: 20 },
  { id: 235, x: 58, y: 74, size: 2.4, delay: 1.29, duration: 21 },
  { id: 236, x: 95, y: 35, size: 3.1, delay: 1.72, duration: 22 },
  { id: 237, x: 32, y: 96, size: 1.0, delay: 2.15, duration: 23 },
  { id: 238, x: 69, y: 57, size: 1.7, delay: 2.58, duration: 24 },
  { id: 239, x: 6, y: 18, size: 2.4, delay: 3.01, duration: 8 },
  { id: 240, x: 43, y: 79, size: 3.1, delay: 3.44, duration: 9 },
  { id: 241, x: 80, y: 40, size: 1.0, delay: 3.87, duration: 10 },
  { id: 242, x: 17, y: 1, size: 1.7, delay: 4.30, duration: 11 },
  { id: 243, x: 54, y: 62, size: 2.4, delay: 0.00, duration: 12 },
  { id: 244, x: 91, y: 23, size: 3.1, delay: 0.43, duration: 13 },
  { id: 245, x: 28, y: 84, size: 1.0, delay: 0.86, duration: 14 },
  { id: 246, x: 65, y: 45, size: 1.7, delay: 1.29, duration: 15 },
  { id: 247, x: 2, y: 6, size: 2.4, delay: 1.72, duration: 16 },
  { id: 248, x: 39, y: 67, size: 3.1, delay: 2.15, duration: 17 },
  { id: 249, x: 76, y: 28, size: 1.0, delay: 2.58, duration: 18 },
  { id: 250, x: 13, y: 89, size: 1.7, delay: 3.01, duration: 19 },
  { id: 251, x: 50, y: 50, size: 2.4, delay: 3.44, duration: 20 },
  { id: 252, x: 87, y: 11, size: 3.1, delay: 3.87, duration: 21 },
  { id: 253, x: 24, y: 72, size: 1.0, delay: 4.30, duration: 22 },
  { id: 254, x: 61, y: 33, size: 1.7, delay: 0.00, duration: 23 },
  { id: 255, x: 98, y: 94, size: 2.4, delay: 0.43, duration: 24 },
  { id: 256, x: 35, y: 55, size: 3.1, delay: 0.86, duration: 8 },
  { id: 257, x: 72, y: 16, size: 1.0, delay: 1.29, duration: 9 },
  { id: 258, x: 9, y: 77, size: 1.7, delay: 1.72, duration: 10 },
  { id: 259, x: 46, y: 38, size: 2.4, delay: 2.15, duration: 11 },
  { id: 260, x: 83, y: 99, size: 3.1, delay: 2.58, duration: 12 },
  { id: 261, x: 20, y: 60, size: 1.0, delay: 3.01, duration: 13 },
  { id: 262, x: 57, y: 21, size: 1.7, delay: 3.44, duration: 14 },
  { id: 263, x: 94, y: 82, size: 2.4, delay: 3.87, duration: 15 },
  { id: 264, x: 31, y: 43, size: 3.1, delay: 4.30, duration: 16 },
  { id: 265, x: 68, y: 4, size: 1.0, delay: 0.00, duration: 17 },
  { id: 266, x: 5, y: 65, size: 1.7, delay: 0.43, duration: 18 },
  { id: 267, x: 42, y: 26, size: 2.4, delay: 0.86, duration: 19 },
  { id: 268, x: 79, y: 87, size: 3.1, delay: 1.29, duration: 20 },
  { id: 269, x: 16, y: 48, size: 1.0, delay: 1.72, duration: 21 },
  { id: 270, x: 53, y: 9, size: 1.7, delay: 2.15, duration: 22 },
  { id: 271, x: 90, y: 70, size: 2.4, delay: 2.58, duration: 23 },
  { id: 272, x: 27, y: 31, size: 3.1, delay: 3.01, duration: 24 },
  { id: 273, x: 64, y: 92, size: 1.0, delay: 3.44, duration: 8 },
  { id: 274, x: 1, y: 53, size: 1.7, delay: 3.87, duration: 9 },
  { id: 275, x: 38, y: 14, size: 2.4, delay: 4.30, duration: 10 },
  { id: 276, x: 75, y: 75, size: 3.1, delay: 0.00, duration: 11 },
  { id: 277, x: 12, y: 36, size: 1.0, delay: 0.43, duration: 12 },
  { id: 278, x: 49, y: 97, size: 1.7, delay: 0.86, duration: 13 },
  { id: 279, x: 86, y: 58, size: 2.4, delay: 1.29, duration: 14 },
  { id: 280, x: 23, y: 19, size: 3.1, delay: 1.72, duration: 15 }
];

function TechnologyItem({
  technology,
  index,
  activeTechnology,
  onActivate
}) {
  const itemRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handlePointerMove = useCallback((event) => {
    const element = itemRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();

    const px =
      (event.clientX - rect.left) /
      Math.max(rect.width, 1);

    const py =
      (event.clientY - rect.top) /
      Math.max(rect.height, 1);

    setTilt({
      x: (py - 0.5) * -18,
      y: (px - 0.5) * 18
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={itemRef}
      className={`contact-tech-item ${
        activeTechnology === index ? "is-active" : ""
      }`}
      title={technology.name}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerEnter={() => onActivate(index)}
      style={{
        transform: `
          perspective(700px)
          rotateX(${tilt.x}deg)
          rotateY(${tilt.y}deg)
        `
      }}
    >
      <div className="contact-tech-icon">
        <span className="contact-tech-glow" />
        <span className="contact-tech-orbit" />
        <i className={technology.icon} />
        <span className="contact-tech-shine" />
      </div>

      <span className="contact-tech-name">
        {technology.name}
      </span>

      <span className="contact-tech-index">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

function ContactTechMarquee({
  scrollVelocity,
  activeTechnology,
  onActivate
}) {
  const marqueeItems = useMemo(
    () => [
      ...technologies,
      ...technologies,
      ...technologies
    ],
    []
  );

  const trackRef = useRef(null);
  const animationRef = useRef(0);
  const positionRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    let last = performance.now();

    const tick = (now) => {
      const delta = Math.min(40, now - last);
      last = now;

      const track = trackRef.current;

      if (track && !pausedRef.current) {
        const speed =
          0.035 +
          Math.min(
            2.5,
            Math.abs(scrollVelocity) * 0.0018
          );

        positionRef.current -= delta * speed;

        const cycle = track.scrollWidth / 3;

        if (
          cycle > 0 &&
          Math.abs(positionRef.current) >= cycle
        ) {
          positionRef.current += cycle;
        }

        track.style.transform = `
          translate3d(${positionRef.current}px,0,0)
        `;
      }

      animationRef.current =
        requestAnimationFrame(tick);
    };

    animationRef.current =
      requestAnimationFrame(tick);

    return () =>
      cancelAnimationFrame(animationRef.current);
  }, [scrollVelocity]);

  return (
    <div className="contact-tech-marquee">
      <div className="contact-tech-header">
        <span className="contact-tech-line" />

        <span className="contact-tech-label">
          Tecnologías utilizadas
        </span>

        <span className="contact-tech-line" />
      </div>

      <div
        className="contact-tech-viewport"
        onPointerEnter={() => {
          pausedRef.current = true;
        }}
        onPointerLeave={() => {
          pausedRef.current = false;
        }}
      >
        <div className="contact-tech-fade contact-tech-fade-left" />
        <div className="contact-tech-fade contact-tech-fade-right" />

        <div
          ref={trackRef}
          className="contact-tech-track"
        >
          {marqueeItems.map((technology, index) => (
            <TechnologyItem
              key={`${technology.name}-${index}`}
              technology={technology}
              index={index % technologies.length}
              activeTechnology={activeTechnology}
              onActivate={onActivate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Contact() {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const informationRef = useRef(null);
  const formRef = useRef(null);
  const technologyRef = useRef(null);
  const footerRef = useRef(null);

  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);

  const particleLayerRef = useRef(null);
  const gridRef = useRef(null);
  const scanRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const orbitRef = useRef(null);
  const progressRef = useRef(null);
  const messageRef = useRef(null);

  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const [isVisible, setIsVisible] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);
  const [activeField, setActiveField] = useState(null);
  const [activeTechnology, setActiveTechnology] =
    useState(-1);

  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
    nx: 0,
    ny: 0
  });

  const [smoothMouse, setSmoothMouse] = useState({
    x: 0,
    y: 0
  });

  const [scrollProgress, setScrollProgress] =
    useState(0);

  const [scrollVelocity, setScrollVelocity] =
    useState(0);

  const [viewportHeight, setViewportHeight] =
    useState(() => window.innerHeight);

  const [isReducedMotion, setIsReducedMotion] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [focusedMessage, setFocusedMessage] =
    useState(false);

  /* ============================================================
     TEMA
     ============================================================ */

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(
        localStorage.getItem("theme") === "dark"
      );
    };

    window.addEventListener(
      "themechange",
      updateTheme
    );

    window.addEventListener(
      "storage",
      updateTheme
    );

    return () => {
      window.removeEventListener(
        "themechange",
        updateTheme
      );

      window.removeEventListener(
        "storage",
        updateTheme
      );
    };
  }, []);

  /* ============================================================
     REDUCED MOTION
     ============================================================ */

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () =>
      setIsReducedMotion(media.matches);

    update();

    media.addEventListener("change", update);

    return () =>
      media.removeEventListener("change", update);
  }, []);

  /* ============================================================
     VISIBILIDAD DE LA SECCIÓN
     ============================================================ */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              section.classList.add(
                "contact-is-visible"
              );
            }
          });
        },
        {
          threshold: 0.12
        }
      );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* ============================================================
     VISIBILIDAD DE ETAPAS
     ============================================================ */

  useEffect(() => {
    const refs = [
      heroRef,
      informationRef,
      formRef,
      technologyRef,
      footerRef
    ];

    const elements = refs
      .map((ref) => ref.current)
      .filter(Boolean);

    if (!elements.length) return undefined;

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(
                "contact-stage-visible"
              );
            }
          });
        },
        {
          threshold: 0.16,
          rootMargin: "0px 0px -8% 0px"
        }
      );

    elements.forEach((element) =>
      observer.observe(element)
    );

    return () => observer.disconnect();
  }, []);

  /* ============================================================
     VIEWPORT
     ============================================================ */

  useEffect(() => {
    const resize = () =>
      setViewportHeight(window.innerHeight);

    window.addEventListener("resize", resize);

    return () =>
      window.removeEventListener("resize", resize);
  }, []);

  /* ============================================================
     MOUSE GLOBAL
     ============================================================ */

  useEffect(() => {
    if (isReducedMotion) return undefined;

    let raf = 0;

    const move = (event) => {
      const x = event.clientX;
      const y = event.clientY;

      const nx =
        (x / Math.max(window.innerWidth, 1) - 0.5) *
        2;

      const ny =
        (y / Math.max(window.innerHeight, 1) - 0.5) *
        2;

      setMouse({
        x,
        y,
        nx,
        ny
      });

      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        setSmoothMouse((previous) => ({
          x:
            previous.x +
            (x - previous.x) * 0.16,

          y:
            previous.y +
            (y - previous.y) * 0.16
        }));
      });
    };

    window.addEventListener(
      "pointermove",
      move,
      {
        passive: true
      }
    );

    return () => {
      cancelAnimationFrame(raf);

      window.removeEventListener(
        "pointermove",
        move
      );
    };
  }, [isReducedMotion]);

  /* ============================================================
     CURSOR
     ============================================================ */

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = cursorRingRef.current;

    if (
      !cursor ||
      !ring ||
      isReducedMotion
    ) {
      return undefined;
    }

    cursor.style.transform =
      `translate3d(${smoothMouse.x}px,${smoothMouse.y}px,0)`;

    ring.style.transform =
      `translate3d(${smoothMouse.x}px,${smoothMouse.y}px,0)`;

    return undefined;
  }, [smoothMouse, isReducedMotion]);

  /* ============================================================
     SCROLL PROGRESS + VELOCIDAD
     ============================================================ */

  useEffect(() => {
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let raf = 0;

    const update = () => {
      const now = performance.now();
      const y = window.scrollY;

      const max = Math.max(
        1,
        document.documentElement.scrollHeight -
          viewportHeight
      );

      const progress = Math.min(
        1,
        Math.max(0, y / max)
      );

      const dt = Math.max(
        16,
        now - lastTime
      );

      const velocity =
        ((y - lastY) / dt) * 1000;

      setScrollProgress(progress);
      setScrollVelocity(velocity);

      lastY = y;
      lastTime = now;
    };

    const scroll = () => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(update);
    };

    update();

    window.addEventListener(
      "scroll",
      scroll,
      {
        passive: true
      }
    );

    return () => {
      cancelAnimationFrame(raf);

      window.removeEventListener(
        "scroll",
        scroll
      );
    };
  }, [viewportHeight]);

  /* ============================================================
     PARALLAX GENERAL DE LA SECCIÓN
     ============================================================ */

  useEffect(() => {
    const section = sectionRef.current;

    if (
      !section ||
      isReducedMotion
    ) {
      return undefined;
    }

    let raf = 0;

    const update = () => {
      const rect =
        section.getBoundingClientRect();

      const local =
        (viewportHeight - rect.top) /
        Math.max(
          viewportHeight + rect.height,
          1
        );

      const clamped = Math.min(
        1,
        Math.max(0, local)
      );

      section.style.setProperty(
        "--contact-scroll",
        clamped.toFixed(4)
      );

      section.style.setProperty(
        "--contact-mouse-x",
        `${mouse.nx}`
      );

      section.style.setProperty(
        "--contact-mouse-y",
        `${mouse.ny}`
      );

      raf =
        requestAnimationFrame(update);
    };

    raf =
      requestAnimationFrame(update);

    return () =>
      cancelAnimationFrame(raf);
  }, [
    mouse.nx,
    mouse.ny,
    viewportHeight,
    isReducedMotion
  ]);

  /* ============================================================
     PARTÍCULAS
     ============================================================ */

  useEffect(() => {
    const layer =
      particleLayerRef.current;

    if (
      !layer ||
      isReducedMotion
    ) {
      return undefined;
    }

    const nodes = Array.from(
      layer.querySelectorAll(
        "[data-particle]"
      )
    );

    const started =
      performance.now();

    let raf = 0;

    const tick = (now) => {
      const elapsed =
        (now - started) / 1000;

      nodes.forEach(
        (node, index) => {
          const seed =
            particleSeed[
              index %
                particleSeed.length
            ];

          const wave =
            Math.sin(
              (elapsed /
                seed.duration) *
                Math.PI *
                2 +
                seed.delay
            );

          const drift =
            Math.cos(
              (elapsed /
                (seed.duration + 4)) *
                Math.PI *
                2 +
                seed.id
            );

          node.style.transform =
            `translate3d(${wave * 9 + drift * 4}px,${drift * 12 + wave * 3}px,0) scale(${1 + wave * 0.22})`;

          node.style.opacity =
            String(
              0.22 +
                (wave + 1) * 0.22
            );
        }
      );

      raf =
        requestAnimationFrame(tick);
    };

    raf =
      requestAnimationFrame(tick);

    return () =>
      cancelAnimationFrame(raf);
  }, [isReducedMotion]);

  /* ============================================================
     GRID
     ============================================================ */

  useEffect(() => {
    const grid =
      gridRef.current;

    if (
      !grid ||
      isReducedMotion
    ) {
      return undefined;
    }

    let raf = 0;

    const tick = () => {
      grid.style.transform =
        `translate3d(${mouse.nx * 18}px,${mouse.ny * 12 - scrollProgress * 24}px,0) scale(1.03)`;

      raf =
        requestAnimationFrame(tick);
    };

    raf =
      requestAnimationFrame(tick);

    return () =>
      cancelAnimationFrame(raf);
  }, [
    mouse.nx,
    mouse.ny,
    scrollProgress,
    isReducedMotion
  ]);

  /* ============================================================
     TÍTULO
     ============================================================ */

  useEffect(() => {
    const title =
      titleRef.current;

    if (!title) return undefined;

    title
      .querySelectorAll(
        "[data-letter]"
      )
      .forEach(
        (letter, index) => {
          letter.style.setProperty(
            "--letter-delay",
            `${index * 55}ms`
          );
        }
      );

    return undefined;
  }, [isVisible]);

  /* ============================================================
     BOTÓN MAGNÉTICO
     ============================================================ */

  useEffect(() => {
    const button =
      buttonRef.current;

    if (
      !button ||
      isReducedMotion
    ) {
      return undefined;
    }

    const move = (event) => {
      const rect =
        button.getBoundingClientRect();

      button.style.setProperty(
        "--magnet-x",
        `${
          (event.clientX -
            rect.left -
            rect.width / 2) *
          0.18
        }px`
      );

      button.style.setProperty(
        "--magnet-y",
        `${
          (event.clientY -
            rect.top -
            rect.height / 2) *
          0.18
        }px`
      );
    };

    const leave = () => {
      button.style.setProperty(
        "--magnet-x",
        "0px"
      );

      button.style.setProperty(
        "--magnet-y",
        "0px"
      );
    };

    button.addEventListener(
      "pointermove",
      move
    );

    button.addEventListener(
      "pointerleave",
      leave
    );

    return () => {
      button.removeEventListener(
        "pointermove",
        move
      );

      button.removeEventListener(
        "pointerleave",
        leave
      );
    };
  }, [isReducedMotion]);

  /* ============================================================
     TRACKING DE CAMPOS
     ============================================================ */

  useEffect(() => {
    const form =
      formRef.current;

    if (!form) return undefined;

    const fields =
      form.querySelectorAll(
        "input,textarea"
      );

    const cleanups = [];

    fields.forEach((field) => {
      const move = (event) => {
        const rect =
          field.getBoundingClientRect();

        const x =
          ((event.clientX -
            rect.left) /
            Math.max(
              rect.width,
              1
            )) *
          100;

        field.style.setProperty(
          "--field-x",
          `${x}%`
        );
      };

      field.addEventListener(
        "pointermove",
        move
      );

      cleanups.push(() =>
        field.removeEventListener(
          "pointermove",
          move
        )
      );
    });

    return () =>
      cleanups.forEach(
        (cleanup) => cleanup()
      );
  }, [isVisible]);

  /* ============================================================
     ÓRBITA TECNOLÓGICA
     
     IMPORTANTE:
     Esta animación NO depende del mouse.
     Tampoco depende del scroll.
     La referencia temporal se crea una sola vez.
     ============================================================ */

  useEffect(() => {
    const orbit =
      orbitRef.current;

    if (
      !orbit ||
      isReducedMotion
    ) {
      return undefined;
    }

    let raf = 0;

    const start =
      performance.now();

    const tick = (now) => {
      const seconds =
        (now - start) / 1000;

      const rotation =
        seconds * 7;

      orbit.style.transform =
        `rotate(${rotation}deg)`;

      raf =
        requestAnimationFrame(tick);
    };

    raf =
      requestAnimationFrame(tick);

    return () =>
      cancelAnimationFrame(raf);
  }, [isReducedMotion]);

  /* ============================================================
     SCAN LINE
     ============================================================ */

  useEffect(() => {
    const scan =
      scanRef.current;

    if (
      !scan ||
      isReducedMotion
    ) {
      return undefined;
    }

    let raf = 0;

    const start =
      performance.now();

    const tick = (now) => {
      const y =
        (((now - start) / 1000) *
          38) %
        120;

      scan.style.transform =
        `translate3d(0,${y}%,0)`;

      raf =
        requestAnimationFrame(tick);
    };

    raf =
      requestAnimationFrame(tick);

    return () =>
      cancelAnimationFrame(raf);
  }, [isReducedMotion]);

  /* ============================================================
     PROGRESO
     ============================================================ */

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.transform =
        `scaleX(${scrollProgress})`;
    }
  }, [scrollProgress]);

  /* ============================================================
     PROGRESO DEL MENSAJE
     ============================================================ */

  useEffect(() => {
    const message =
      messageRef.current;

    if (!message) return undefined;

    const update = () => {
      message.style.setProperty(
        "--message-progress",
        `${Math.min(
          100,
          message.value.length / 12
        )}%`
      );
    };

    update();

    message.addEventListener(
      "input",
      update
    );

    return () =>
      message.removeEventListener(
        "input",
        update
      );
  }, [formData.message]);

  /* ============================================================
     ARMADO DE ETAPAS
     ============================================================ */

  useEffect(() => {
    [
      heroRef,
      informationRef,
      formRef,
      technologyRef,
      footerRef
    ].forEach((ref) => {
      if (
        ref.current &&
        isVisible
      ) {
        ref.current.classList.add(
          "contact-armed"
        );
      }
    });
  }, [isVisible]);

  /* ============================================================
     HOVER GLOBAL
     ============================================================ */

  useEffect(() => {
    const root =
      sectionRef.current;

    if (!root) return undefined;

    const hoverables =
      root.querySelectorAll(
        "a,button,.contact-detail,.contact-tech-item"
      );

    const enter = (event) =>
      event.currentTarget.classList.add(
        "contact-hover-active"
      );

    const leave = (event) =>
      event.currentTarget.classList.remove(
        "contact-hover-active"
      );

    hoverables.forEach(
      (element) => {
        element.addEventListener(
          "pointerenter",
          enter
        );

        element.addEventListener(
          "pointerleave",
          leave
        );
      }
    );

    return () =>
      hoverables.forEach(
        (element) => {
          element.removeEventListener(
            "pointerenter",
            enter
          );

          element.removeEventListener(
            "pointerleave",
            leave
          );
        }
      );
  }, [isVisible]);

  /* ============================================================
     FORMULARIO
     ============================================================ */

  const handleChange = useCallback(
    (event) => {
      const {
        name,
        value
      } = event.target;

      setFormData(
        (previous) => ({
          ...previous,
          [name]: value
        })
      );

      setStatus(null);
    },
    []
  );

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (sending) return;

    setSending(true);
    setStatus(null);

    try {
      const data =
        new FormData();

      data.append(
        "name",
        formData.name
      );

      data.append(
        "email",
        formData.email
      );

      data.append(
        "subject",
        formData.subject
      );

      data.append(
        "message",
        formData.message
      );

      const response =
        await fetch(
          FORM_ENDPOINT,
          {
            method: "POST",
            body: data
          }
        );

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}`
        );
      }

      setStatus({
        type: "success",
        text: "Mensaje enviado correctamente."
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error(
        "Error al enviar el formulario de contacto:",
        error
      );

      setStatus({
        type: "error",
        text: "No fue posible enviar el mensaje. Inténtalo nuevamente."
      });
    } finally {
      setSending(false);
    }
  };

  const particles = useMemo(
    () => particleSeed,
    []
  );

  return (
    <section
      ref={sectionRef}
      className={`
        contact-section
        ${isDark ? "contact-dark" : "contact-light"}
        ${isReducedMotion ? "contact-reduced-motion" : ""}
      `}
      style={{
        "--contact-progress":
          scrollProgress
      }}
    >
      <div
        className="contact-scroll-progress"
        aria-hidden="true"
      >
        <span ref={progressRef} />
      </div>

      <div
        ref={cursorRef}
        className="contact-cursor"
        aria-hidden="true"
      />

      <div
        ref={cursorRingRef}
        className="contact-cursor-ring"
        aria-hidden="true"
      />

      <div
        className="contact-canvas"
        aria-hidden="true"
      >
        <div className="contact-noise" />

        <div
          ref={gridRef}
          className="contact-grid"
        />

        <div className="contact-grid-secondary" />

        <div className="contact-horizontal-line contact-horizontal-line-one" />
        <div className="contact-horizontal-line contact-horizontal-line-two" />

        <div className="contact-orb contact-orb-one" />
        <div className="contact-orb contact-orb-two" />
        <div className="contact-orb contact-orb-three" />

        <div
          ref={scanRef}
          className="contact-scan-line"
        />

        <div
          ref={particleLayerRef}
          className="contact-particle-layer"
        >
          {particles.map(
            (particle) => (
              <span
                key={particle.id}
                data-particle="true"
                className="contact-particle"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`
                }}
              />
            )
          )}
        </div>

        <div className="contact-vignette" />
      </div>

      <div className="contact-inner">
        <header
          ref={heroRef}
          className="contact-header"
        >
          <div className="contact-header-label">
            <span>CONTACTO</span>
            <i />
            <strong>2026</strong>
          </div>

          <div className="contact-header-copy">
            <span className="contact-reveal-item">
              ÚLTIMA PARTE DEL RECORRIDO
            </span>

            <h2
              ref={titleRef}
              className="contact-title-reveal"
            >
              <span data-letter="true">
                H
              </span>

              <span data-letter="true">
                a
              </span>

              <span data-letter="true">
                b
              </span>

              <span data-letter="true">
                l
              </span>

              <span data-letter="true">
                e
              </span>

              <span data-letter="true">
                m
              </span>

              <span data-letter="true">
                o
              </span>

              <span data-letter="true">
                s
              </span>

              <em data-letter="true">
                .
              </em>
            </h2>

            <p className="contact-reveal-item">
              Un espacio para conectar
              ideas, proyectos y
              posibilidades.
            </p>
          </div>

          <div className="contact-header-index">
            <strong>08</strong>
            <span>/ 08</span>
          </div>
        </header>

        <div className="contact-intro-line">
          <span />
          <i />
          <span />
        </div>

        <div className="contact-main">
          <div
            ref={informationRef}
            className="contact-information"
          >
            <div className="contact-information-marker">
              01
            </div>

            <div className="contact-information-top">
              <span>COMUNICACIÓN</span>
              <strong>Hablemos.</strong>
            </div>

            <div className="contact-information-body">
              <p>
                Si tienes un proyecto, una
                colaboración, una consulta
                profesional o simplemente
                quieres conocer más sobre
                este trabajo, puedes
                escribirme.
              </p>

              <div className="contact-details">
                <div className="contact-detail">
                  <span>UBICACIÓN</span>
                  <strong>
                    Chilpancingo, Guerrero · México
                  </strong>
                </div>

                <div className="contact-detail">
                  <span>CORREO</span>

                  <a href="mailto:manuel_fusion@hotmail.com">
                    manuel_fusion@hotmail.com
                  </a>
                </div>

                <div className="contact-detail">
                  <span>DISPONIBILIDAD</span>

                  <strong>
                    Proyectos · Consultoría ·
                    Colaboraciones
                  </strong>
                </div>
              </div>
            </div>

            <div className="contact-information-footer">
              <span>
                CONTADOR · ABOGADO
              </span>

              <i />

              <span>
                TECNOLOGÍA · SOFTWARE · IA
              </span>
            </div>
          </div>

          <div
            ref={formRef}
            className="contact-form-wrapper"
          >
            <div className="contact-form-heading">
              <span>02 / MENSAJE</span>

              <p>
                Cuéntame qué tienes en mente.
              </p>
            </div>

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >
              <div className="contact-form-row">
                <label>
                  <span>NOMBRE</span>

                  <div className="contact-input-wrap">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() =>
                        setActiveField(
                          "name"
                        )
                      }
                      onBlur={() =>
                        setActiveField(null)
                      }
                      placeholder="Tu nombre"
                      required
                      className={
                        activeField === "name"
                          ? "is-active"
                          : ""
                      }
                    />

                    <i />
                  </div>
                </label>

                <label>
                  <span>CORREO</span>

                  <div className="contact-input-wrap">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() =>
                        setActiveField(
                          "email"
                        )
                      }
                      onBlur={() =>
                        setActiveField(null)
                      }
                      placeholder="tu@email.com"
                      required
                      className={
                        activeField === "email"
                          ? "is-active"
                          : ""
                      }
                    />

                    <i />
                  </div>
                </label>
              </div>

              <label>
                <span>ASUNTO</span>

                <div className="contact-input-wrap">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() =>
                      setActiveField(
                        "subject"
                      )
                    }
                    onBlur={() =>
                      setActiveField(null)
                    }
                    placeholder="¿En qué podemos trabajar?"
                    required
                    className={
                      activeField ===
                      "subject"
                        ? "is-active"
                        : ""
                    }
                  />

                  <i />
                </div>
              </label>

              <label>
                <span>MENSAJE</span>

                <div className="contact-input-wrap contact-textarea-wrap">
                  <textarea
                    ref={messageRef}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => {
                      setActiveField(
                        "message"
                      );

                      setFocusedMessage(
                        true
                      );
                    }}
                    onBlur={() => {
                      setActiveField(null);

                      setFocusedMessage(
                        false
                      );
                    }}
                    placeholder="Escribe tu mensaje..."
                    rows="7"
                    maxLength="1200"
                    required
                    className={
                      activeField ===
                      "message"
                        ? "is-active"
                        : ""
                    }
                  />

                  <i />

                  <span className="contact-message-count">
                    {formData.message.length}
                    /1200
                  </span>
                </div>
              </label>

              <div
                className={`
                  contact-message-helper
                  ${
                    focusedMessage
                      ? "is-visible"
                      : ""
                  }
                `}
              >
                <span>
                  ESCRIBE CON CLARIDAD{" "}
                </span>

                <span>
                  {formData.message.length <
                  20
                    ? "Puedes explicar brevemente tu proyecto."
                    : "El mensaje está listo para enviarse."}
                </span>
              </div>

              <div className="contact-form-submit">
                <div className="contact-submit-status">
                  <span>
                    RESPUESTA DIRECTA
                  </span>

                  <i
                    className={
                      sending
                        ? "is-sending"
                        : ""
                    }
                  />
                </div>

                <button
                  ref={buttonRef}
                  type="submit"
                  disabled={sending}
                >
                  <span>
                    {sending
                      ? "ENVIANDO..."
                      : "ENVIAR MENSAJE"}
                  </span>

                  <i>
                    {sending
                      ? "·"
                      : "→"}
                  </i>

                  <b />
                </button>
              </div>

              {status && (
                <div
                  className={`
                    contact-form-status
                    contact-form-status-${status.type}
                  `}
                  role="status"
                >
                  <span>
                    {status.type ===
                    "success"
                      ? "✓"
                      : "!"}
                  </span>

                  <p>
                    {status.text}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>

        <section
          ref={technologyRef}
          className="contact-technology"
        >
          <div className="contact-section-heading">
            <div className="contact-section-number">
              03
            </div>

            <div className="contact-section-title">
              <span>DESARROLLO</span>

              <h3>
                Tecnología{" "}
                <em>
                  detrás del proyecto.
                </em>
              </h3>
            </div>

            <p>
              Herramientas y tecnologías
              utilizadas para construir
              este espacio.
            </p>
          </div>

          {/* ==================================================
              SISTEMA ORBITAL TECNOLÓGICO

              La rotación es completamente
              independiente del mouse y del scroll.
              ================================================== */}

          <div
            ref={orbitRef}
            className="contact-tech-orbital-system"
            aria-hidden="true"
          >
            <span className="contact-tech-orbit-ring ring-one" />
            <span className="contact-tech-orbit-ring ring-two" />
            <span className="contact-tech-orbit-ring ring-three" />

            <span className="contact-tech-core">
              MP {" "}
            </span>

            <span className="contact-tech-node node-one">
              WEB {" "}
            </span>

            <span className="contact-tech-node node-two">
              API {" "}
            </span>

            <span className="contact-tech-node node-three">
              DATA {" "}
            </span>

            <span className="contact-tech-node node-four">
              IA {" "}
            </span>
          </div>

          <ContactTechMarquee
            scrollVelocity={scrollVelocity}
            activeTechnology={
              activeTechnology
            }
            onActivate={
              setActiveTechnology
            }
          />

          <div className="contact-tech-caption">
            <span>FRONTEND · </span>
            <i />
            <span>BACKEND · </span>
            <i />
            <span>
              INFRAESTRUCTURA · {" "}
            </span>
            <i />
            <span>
              AUTOMATIZACIÓN 
            </span>
          </div>
        </section>

        <footer
          ref={footerRef}
          className="contact-footer"
        >
          <div className="contact-footer-line" />

          <div className="contact-footer-content">
            <div className="contact-footer-brand">
              <strong>
                MANUEL PARRA
              </strong>

              <span>
                CONTADOR · ABOGADO
              </span>
            </div>

            <div className="contact-footer-center">
              <span>
                TECNOLOGÍA
              </span>

              <i />

              <span>
                CONOCIMIENTO
              </span>

              <i />

              <span>
                EXPERIENCIA
              </span>
            </div>

            <div className="contact-footer-index">
              <strong>
                2026
              </strong>

              <span>
                FIN DEL RECORRIDO
              </span>
            </div>
          </div>

          <div className="contact-footer-bottom">
            <span>
              PROFESIONAL INDEPENDIENTE {" "} ·{" "}
            </span>

            <span>
              TECNOLOGÍA · SOFTWARE · IA
            </span>          
          </div>
        </footer>
      </div>
    </section>
  );
}

export default Contact;