import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import SAPMNav from "./SAPMNav";

const RAW = {
  AE:{n:"United Arab Emirates",g:552.3,ag:0.8,ind:44.3,mfg:9.4,svc:54.9,oil:15.67,gas:1.96,coal:0,min:0,fr:0.0,mil:0,hlt:4.97},
  AF:{n:"Afghanistan",g:17.2,ag:34.7,ind:13.4,mfg:7.5,svc:46.4,oil:0.02,gas:0.0,coal:0.02,min:0,fr:0.39,mil:1.83,hlt:14.99},
  AL:{n:"Albania",g:27.0,ag:15.5,ind:22.4,mfg:6.5,svc:48.7,oil:1.04,gas:0.05,coal:0.03,min:0.18,fr:0.14,mil:2.04,hlt:7.05},
  AM:{n:"Armenia",g:26.0,ag:7.8,ind:22.9,mfg:10.2,svc:62.0,oil:0,gas:0,coal:0.0,min:6.79,fr:0.27,mil:5.48,hlt:9.32},
  AO:{n:"Angola",g:101.0,ag:22.1,ind:34.6,mfg:7.6,svc:41.1,oil:28.27,gas:1.01,coal:0,min:0,fr:0.68,mil:1.0,hlt:2.55},
  AR:{n:"Argentina",g:638.4,ag:5.8,ind:24.0,mfg:15.2,svc:53.7,oil:1.54,gas:0.39,coal:0.0,min:0.58,fr:0.14,mil:0.62,hlt:10.27},
  AT:{n:"Austria",g:534.8,ag:1.2,ind:24.6,mfg:15.1,svc:64.0,oil:0.04,gas:0.02,coal:0,min:0,fr:0.06,mil:1.0,hlt:11.83},
  AU:{n:"Australia",g:1757.0,ag:2.0,ind:25.5,mfg:5.4,svc:66.1,oil:0.26,gas:1.72,coal:0.79,min:10.47,fr:0.12,mil:1.88,hlt:10.4},
  AZ:{n:"Azerbaijan",g:74.3,ag:5.7,ind:42.6,mfg:5.2,svc:42.3,oil:20.98,gas:8.59,coal:0,min:0.35,fr:0.02,mil:4.99,hlt:4.27},
  BA:{n:"Bosnia and Herzegovina",g:29.6,ag:4.5,ind:22.4,mfg:12.7,svc:56.6,oil:0,gas:0,coal:0.3,min:0.04,fr:0.47,mil:0.75,hlt:8.92},
  BD:{n:"Bangladesh",g:450.1,ag:11.2,ind:34.1,mfg:21.9,svc:51.4,oil:0.03,gas:0.49,coal:0.01,min:0,fr:0.08,mil:0.94,hlt:2.17},
  BE:{n:"Belgium",g:671.4,ag:0.8,ind:18.7,mfg:11.4,svc:71.0,oil:0.03,gas:0.0,coal:0,min:0,fr:0.01,mil:1.28,hlt:10.8},
  BF:{n:"Burkina Faso",g:23.1,ag:20.9,ind:26.5,mfg:9.5,svc:43.9,oil:0,gas:0,coal:0,min:15.45,fr:4.68,mil:4.68,hlt:7.8},
  BG:{n:"Bulgaria",g:113.3,ag:2.4,ind:21.1,mfg:0.0,svc:63.8,oil:0.02,gas:0.01,coal:0.13,min:0.59,fr:0.17,mil:2.15,hlt:7.92},
  BH:{n:"Bahrain",g:47.1,ag:0.2,ind:42.3,mfg:19.9,svc:53.2,oil:10.94,gas:5.7,coal:0,min:0,fr:0.0,mil:2.89,hlt:4.0},
  BJ:{n:"Benin",g:21.5,ag:24.2,ind:17.4,mfg:10.2,svc:48.9,oil:0,gas:0,coal:0,min:0,fr:2.3,mil:0.72,hlt:3.34},
  BN:{n:"Brunei Darussalam",g:15.3,ag:1.2,ind:61.7,mfg:10.7,svc:39.0,oil:10.37,gas:13.86,coal:0,min:0,fr:0.05,mil:3.58,hlt:2.23},
  BO:{n:"Bolivia",g:54.9,ag:8.8,ind:31.3,mfg:13.1,svc:53.4,oil:1.26,gas:1.85,coal:0,min:5.91,fr:0.44,mil:1.37,hlt:6.92},
  BR:{n:"Brazil",g:2185.8,ag:5.8,ind:20.9,mfg:12.1,svc:59.2,oil:2.6,gas:0.07,coal:0.01,min:4.49,fr:0.76,mil:0.97,hlt:9.73},
  BS:{n:"Bahamas, The",g:15.8,ag:0.5,ind:9.6,mfg:0.6,svc:77.2,oil:0,gas:0,coal:0,min:0,fr:0.01,mil:0,hlt:6.3},
  BW:{n:"Botswana",g:19.4,ag:1.7,ind:29.4,mfg:5.5,svc:63.5,oil:0,gas:0,coal:0.5,min:0.24,fr:0.3,mil:2.83,hlt:6.26},
  BY:{n:"Belarus",g:76.0,ag:6.9,ind:30.7,mfg:20.3,svc:49.7,oil:0.81,gas:0.04,coal:0,min:0,fr:1.01,mil:2.07,hlt:7.08},
  CA:{n:"Canada",g:2243.6,ag:1.4,ind:22.8,mfg:8.3,svc:59.8,oil:2.83,gas:0.79,coal:0.07,min:1.18,fr:0.07,mil:1.31,hlt:11.31},
  CD:{n:"Congo, Dem. Rep.",g:71.0,ag:9.6,ind:39.9,mfg:8.2,svc:46.6,oil:0.65,gas:0,coal:0,min:28.81,fr:9.36,mil:1.23,hlt:3.68},
  CG:{n:"Congo, Rep.",g:15.7,ag:9.4,ind:40.1,mfg:9.4,svc:45.0,oil:34.38,gas:0.36,coal:0,min:0,fr:2.97,mil:1.19,hlt:3.3},
  CH:{n:"Switzerland",g:936.6,ag:0.6,ind:24.7,mfg:17.7,svc:72.0,oil:0.0,gas:0,coal:0,min:0,fr:0.01,mil:0.72,hlt:11.69},
  CI:{n:"Cote d'Ivoire",g:87.1,ag:15.9,ind:24.0,mfg:12.9,svc:51.9,oil:0.7,gas:0.31,coal:0,min:2.5,fr:1.22,mil:0.76,hlt:3.43},
  CL:{n:"Chile",g:330.3,ag:3.9,ind:30.1,mfg:9.0,svc:56.1,oil:0.01,gas:0.02,coal:0.0,min:16.23,fr:0.64,mil:1.58,hlt:10.53},
  CM:{n:"Cameroon",g:53.3,ag:18.5,ind:23.2,mfg:12.9,svc:50.7,oil:2.36,gas:0.58,coal:0,min:0,fr:2.58,mil:1.01,hlt:4.55},
  CN:{n:"China",g:18743.8,ag:6.8,ind:36.5,mfg:24.9,svc:56.7,oil:0.31,gas:0.21,coal:0.61,min:0.51,fr:0.07,mil:1.71,hlt:5.94},
  CO:{n:"Colombia",g:418.8,ag:9.3,ind:23.1,mfg:10.1,svc:58.1,oil:3.42,gas:0.18,coal:0.73,min:0.91,fr:0.09,mil:3.36,hlt:8.14},
  CR:{n:"Costa Rica",g:95.4,ag:3.6,ind:19.7,mfg:13.0,svc:68.8,oil:0.01,gas:0,coal:0,min:0,fr:0.75,mil:0,hlt:6.87},
  CU:{n:"Cuba",g:107.4,ag:2.8,ind:23.0,mfg:11.2,svc:73.5,oil:0.22,gas:0.02,coal:0,min:0.24,fr:0.07,mil:0,hlt:9.38},
  CY:{n:"Cyprus",g:37.6,ag:1.2,ind:11.1,mfg:4.5,svc:76.5,oil:0,gas:0,coal:0,min:0.01,fr:0.0,mil:1.65,hlt:8.12},
  CZ:{n:"Czechia",g:347.0,ag:1.9,ind:29.2,mfg:19.9,svc:60.2,oil:0.01,gas:0.01,coal:0.09,min:0,fr:0.28,mil:1.92,hlt:8.51},
  DE:{n:"Germany",g:4685.6,ag:0.9,ind:25.6,mfg:18.0,svc:64.0,oil:0.01,gas:0.02,coal:0.01,min:0,fr:0.03,mil:1.89,hlt:12.27},
  DK:{n:"Denmark",g:424.5,ag:0.9,ind:24.1,mfg:17.9,svc:63.5,oil:0.27,gas:0.06,coal:0,min:0,fr:0.01,mil:2.42,hlt:9.39},
  DO:{n:"Dominican Republic",g:124.3,ag:4.5,ind:28.7,mfg:12.5,svc:59.8,oil:0,gas:0,coal:0,min:2.04,fr:0.03,mil:0.78,hlt:4.6},
  DZ:{n:"Algeria",g:269.3,ag:14.0,ind:36.2,mfg:9.5,svc:46.8,oil:14.46,gas:8.0,coal:0,min:0.0,fr:0.13,mil:7.97,hlt:4.35},
  EC:{n:"Ecuador",g:124.7,ag:9.5,ind:26.5,mfg:12.9,svc:57.2,oil:6.4,gas:0.01,coal:0,min:0,fr:0.28,mil:2.22,hlt:7.56},
  EE:{n:"Estonia",g:43.1,ag:1.8,ind:20.1,mfg:10.8,svc:65.7,oil:0.96,gas:0,coal:0,min:0,fr:0.76,mil:3.37,hlt:7.84},
  EG:{n:"Egypt, Arab Rep.",g:389.1,ag:13.7,ind:32.6,mfg:13.9,svc:48.9,oil:2.99,gas:2.05,coal:0,min:0,fr:0.11,mil:0.67,hlt:4.88},
  ES:{n:"Spain",g:1725.7,ag:2.8,ind:19.5,mfg:10.8,svc:68.9,oil:0.0,gas:0.0,coal:0,min:0.1,fr:0.02,mil:1.43,hlt:9.22},
  ET:{n:"Ethiopia",g:149.7,ag:34.8,ind:25.4,mfg:4.4,svc:37.5,oil:0,gas:0,coal:0.0,min:0.26,fr:5.6,mil:0.65,hlt:2.8},
  FI:{n:"Finland",g:298.7,ag:2.5,ind:22.8,mfg:14.2,svc:62.2,oil:0.05,gas:0,coal:0,min:0.11,fr:0.29,mil:2.3,hlt:10.47},
  FR:{n:"France",g:3160.4,ag:1.3,ind:17.2,mfg:9.6,svc:70.9,oil:0.01,gas:0.0,coal:0,min:0,fr:0.03,mil:2.05,hlt:11.54},
  GA:{n:"Gabon",g:20.9,ag:6.6,ind:52.9,mfg:19.5,svc:36.8,oil:15.56,gas:0.27,coal:0,min:0.02,fr:2.65,mil:1.54,hlt:3.13},
  GB:{n:"United Kingdom",g:3686.0,ag:0.6,ind:17.1,mfg:8.0,svc:72.4,oil:0.42,gas:0.17,coal:0.0,min:0.0,fr:0,mil:2.28,hlt:11.13},
  GE:{n:"Georgia",g:34.2,ag:5.5,ind:19.6,mfg:8.4,svc:62.0,oil:0.03,gas:0.01,coal:0.01,min:1.28,fr:0.07,mil:1.86,hlt:6.86},
  GH:{n:"Ghana",g:82.3,ag:20.9,ind:31.5,mfg:9.8,svc:40.9,oil:4.06,gas:0.37,coal:0,min:5.17,fr:3.76,mil:0.38,hlt:2.95},
  GN:{n:"Guinea",g:25.0,ag:31.0,ind:25.1,mfg:10.1,svc:36.3,oil:0,gas:0,coal:0,min:0,fr:4.52,mil:2.05,hlt:3.69},
  GQ:{n:"Equatorial Guinea",g:12.8,ag:3.1,ind:45.8,mfg:24.8,svc:51.1,oil:14.94,gas:6.63,coal:0,min:0,fr:1.93,mil:0.98,hlt:3.5},
  GR:{n:"Greece",g:256.2,ag:3.8,ind:15.0,mfg:9.1,svc:68.0,oil:0.01,gas:0.0,coal:0.01,min:0.05,fr:0.01,mil:3.13,hlt:8.39},
  GT:{n:"Guatemala",g:113.2,ag:9.8,ind:21.7,mfg:13.6,svc:61.8,oil:0.12,gas:0.0,coal:0,min:1.12,fr:0.69,mil:0.37,hlt:6.8},
  GY:{n:"Guyana",g:24.7,ag:7.6,ind:76.0,mfg:1.7,svc:14.5,oil:22.08,gas:0,coal:0,min:9.38,fr:2.22,mil:0.87,hlt:2.47},
  HK:{n:"Hong Kong SAR, China",g:406.9,ag:0.0,ind:6.2,mfg:0.9,svc:91.8,oil:0.0,gas:0,coal:0,min:0,fr:0.0,mil:0,hlt:0},
  HN:{n:"Honduras",g:37.1,ag:11.2,ind:26.1,mfg:14.9,svc:58.4,oil:0.0,gas:0,coal:0,min:0.38,fr:0.84,mil:1.58,hlt:7.71},
  HR:{n:"Croatia",g:93.0,ag:2.9,ind:19.2,mfg:10.5,svc:60.8,oil:0.28,gas:0.18,coal:0,min:0,fr:0.22,mil:1.79,hlt:7.15},
  HT:{n:"Haiti",g:25.2,ag:15.9,ind:33.4,mfg:26.2,svc:48.3,oil:0,gas:0,coal:0,min:0,fr:0.33,mil:0.07,hlt:3.19},
  HU:{n:"Hungary",g:222.7,ag:2.7,ind:23.7,mfg:15.8,svc:59.5,oil:0.18,gas:0.13,coal:0.01,min:0,fr:0.08,mil:2.16,hlt:6.37},
  ID:{n:"Indonesia",g:1396.3,ag:12.6,ind:39.3,mfg:19.0,svc:43.8,oil:0.77,gas:0.84,coal:1.22,min:1.91,fr:0.42,mil:0.78,hlt:2.7},
  IE:{n:"Ireland",g:609.2,ag:1.0,ind:33.6,mfg:29.6,svc:60.6,oil:0.0,gas:0.05,coal:0,min:0.04,fr:0.01,mil:0.24,hlt:6.85},
  IL:{n:"Israel",g:540.4,ag:1.3,ind:17.3,mfg:11.1,svc:72.5,oil:0.01,gas:0.43,coal:0,min:0,fr:0.0,mil:8.78,hlt:7.1},
  IN:{n:"India",g:3909.9,ag:16.3,ind:24.6,mfg:12.6,svc:49.9,oil:0.33,gas:0.08,coal:1.28,min:1.32,fr:0.16,mil:2.27,hlt:3.34},
  IQ:{n:"Iraq",g:279.6,ag:3.4,ind:51.6,mfg:4.1,svc:45.8,oil:42.79,gas:0.66,coal:0,min:0,fr:0.0,mil:2.36,hlt:5.53},
  IR:{n:"Iran, Islamic Rep.",g:475.3,ag:10.8,ind:36.1,mfg:20.6,svc:49.8,oil:18.27,gas:8.81,coal:0.01,min:3.36,fr:0.01,mil:2.01,hlt:6.03},
  IS:{n:"Iceland",g:33.3,ag:4.0,ind:20.1,mfg:8.6,svc:64.9,oil:0,gas:0,coal:0,min:0,fr:0.0,mil:0,hlt:8.98},
  IT:{n:"Italy",g:2380.8,ag:2.0,ind:22.3,mfg:14.8,svc:65.0,oil:0.08,gas:0.03,coal:0,min:0,fr:0.01,mil:1.61,hlt:8.44},
  JG:{n:"Channel Islands",g:12.5,ag:0.6,ind:8.2,mfg:0.8,svc:91.2,oil:0,gas:0,coal:0,min:0,fr:0,mil:0,hlt:0},
  JM:{n:"Jamaica",g:22.0,ag:8.0,ind:16.5,mfg:7.7,svc:60.0,oil:0.29,gas:0,coal:0,min:0,fr:0.16,mil:1.27,hlt:7.6},
  JO:{n:"Jordan",g:53.4,ag:5.1,ind:25.1,mfg:17.7,svc:60.4,oil:0.01,gas:0.04,coal:0,min:0,fr:0.02,mil:4.8,hlt:7.66},
  JP:{n:"Japan",g:4027.6,ag:1.0,ind:29.9,mfg:21.5,svc:73.0,oil:0.0,gas:0.01,coal:0.0,min:0.01,fr:0.03,mil:1.37,hlt:10.74},
  KE:{n:"Kenya",g:120.3,ag:22.5,ind:16.5,mfg:7.3,svc:55.3,oil:0,gas:0,coal:0,min:0.01,fr:1.22,mil:1.0,hlt:4.35},
  KG:{n:"Kyrgyz Republic",g:17.5,ag:8.6,ind:24.7,mfg:12.6,svc:52.1,oil:0.08,gas:0.0,coal:0.26,min:11.15,fr:0.01,mil:2.97,hlt:4.5},
  KH:{n:"Cambodia",g:46.4,ag:16.6,ind:41.8,mfg:27.8,svc:35.6,oil:0.04,gas:0,coal:0.0,min:0,fr:0.79,mil:1.52,hlt:4.62},
  KR:{n:"Korea, Rep.",g:1875.4,ag:1.5,ind:33.9,mfg:26.6,svc:57.5,oil:0.03,gas:0.01,coal:0.0,min:0.0,fr:0.01,mil:2.56,hlt:8.68},
  KW:{n:"Kuwait",g:160.2,ag:0.5,ind:57.1,mfg:8.0,svc:55.9,oil:27.58,gas:1.7,coal:0,min:0,fr:0.0,mil:4.84,hlt:4.96},
  KZ:{n:"Kazakhstan",g:291.5,ag:3.9,ind:32.1,mfg:12.4,svc:57.9,oil:14.84,gas:2.04,coal:0.85,min:9.1,fr:0.01,mil:0.43,hlt:3.77},
  LA:{n:"Lao PDR",g:16.5,ag:16.8,ind:29.0,mfg:9.1,svc:43.5,oil:0,gas:0,coal:0,min:3.89,fr:1.49,mil:0,hlt:1.33},
  LB:{n:"Lebanon",g:20.1,ag:1.0,ind:2.1,mfg:1.6,svc:42.4,oil:0,gas:0,coal:0,min:0,fr:0.0,mil:2.59,hlt:5.57},
  LK:{n:"Sri Lanka",g:99.0,ag:8.3,ind:25.5,mfg:17.6,svc:57.5,oil:0,gas:0,coal:0,min:0,fr:0.08,mil:1.43,hlt:3.68},
  LT:{n:"Lithuania",g:84.9,ag:2.6,ind:23.4,mfg:14.0,svc:63.6,oil:0.02,gas:0,coal:0,min:0,fr:0.27,mil:3.12,hlt:7.6},
  LU:{n:"Luxembourg",g:93.3,ag:0.2,ind:9.7,mfg:4.0,svc:81.2,oil:0,gas:0,coal:0,min:0,fr:0.0,mil:0.96,hlt:5.89},
  LV:{n:"Latvia",g:43.7,ag:4.0,ind:18.5,mfg:9.9,svc:64.6,oil:0.07,gas:0,coal:0,min:0,fr:1.1,mil:3.26,hlt:7.28},
  LY:{n:"Libya",g:48.5,ag:2.4,ind:73.5,mfg:0.0,svc:28.3,oil:56.38,gas:4.58,coal:0,min:0,fr:0.08,mil:5.29,hlt:7.81},
  MA:{n:"Morocco",g:160.6,ag:10.6,ind:25.6,mfg:15.3,svc:52.7,oil:0.0,gas:0.01,coal:0,min:0.27,fr:0.12,mil:3.52,hlt:6.06},
  MC:{n:"Monaco",g:11.1,ag:0.0,ind:12.8,mfg:0.0,svc:87.2,oil:0,gas:0,coal:0,min:0,fr:0,mil:0,hlt:3.12},
  MD:{n:"Moldova",g:18.2,ag:7.1,ind:16.8,mfg:7.7,svc:62.3,oil:0.01,gas:0.0,coal:0,min:0,fr:0.22,mil:0.6,hlt:6.74},
  MG:{n:"Madagascar",g:17.4,ag:22.5,ind:22.8,mfg:12.6,svc:47.7,oil:0.08,gas:0,coal:0,min:0,fr:5.45,mil:0.71,hlt:3.43},
  MK:{n:"North Macedonia",g:17.0,ag:6.1,ind:24.1,mfg:14.3,svc:56.2,oil:0,gas:0,coal:0.01,min:0,fr:0.13,mil:2.1,hlt:7.43},
  ML:{n:"Mali",g:26.8,ag:33.3,ind:23.5,mfg:7.6,svc:36.3,oil:0,gas:0,coal:0,min:16.18,fr:2.23,mil:4.2,hlt:3.81},
  MM:{n:"Myanmar",g:74.1,ag:20.8,ind:37.8,mfg:22.5,svc:41.4,oil:0.06,gas:4.4,coal:0.05,min:2.0,fr:2.17,mil:6.79,hlt:4.46},
  MN:{n:"Mongolia",g:23.8,ag:7.3,ind:38.1,mfg:5.6,svc:44.3,oil:1.5,gas:0,coal:4.89,min:26.57,fr:0.17,mil:0.74,hlt:6.07},
  MO:{n:"Macao SAR, China",g:49.5,ag:0.0,ind:5.0,mfg:0.7,svc:83.8,oil:0,gas:0,coal:0,min:0,fr:0.0,mil:0,hlt:0},
  MR:{n:"Mauritania",g:10.9,ag:19.3,ind:30.5,mfg:5.0,svc:42.4,oil:0,gas:0,coal:0.67,min:9.59,fr:1.19,mil:2.16,hlt:4.34},
  MT:{n:"Malta",g:25.0,ag:0.2,ind:10.7,mfg:5.8,svc:81.8,oil:0,gas:0,coal:0,min:0,fr:0,mil:0.45,hlt:8.84},
  MU:{n:"Mauritius",g:14.9,ag:4.2,ind:17.8,mfg:11.1,svc:64.4,oil:0,gas:0,coal:0,min:0,fr:0.0,mil:0.15,hlt:5.57},
  MW:{n:"Malawi",g:11.3,ag:31.8,ind:17.1,mfg:11.0,svc:44.2,oil:0,gas:0,coal:0.02,min:0.01,fr:4.2,mil:1.02,hlt:6.53},
  MX:{n:"Mexico",g:1856.4,ag:3.7,ind:31.8,mfg:19.8,svc:58.1,oil:2.07,gas:0.09,coal:0.02,min:1.36,fr:0.11,mil:0.89,hlt:5.5},
  MY:{n:"Malaysia",g:422.2,ag:8.1,ind:37.0,mfg:22.5,svc:53.7,oil:1.85,gas:3.35,coal:0.03,min:0,fr:1.7,mil:0.99,hlt:3.96},
  MZ:{n:"Mozambique",g:22.7,ag:25.2,ind:21.9,mfg:6.4,svc:41.1,oil:0.08,gas:3.57,coal:3.78,min:0.14,fr:7.34,mil:1.99,hlt:8.5},
  NA:{n:"Namibia",g:13.4,ag:7.3,ind:28.9,mfg:10.6,svc:54.5,oil:0,gas:0,coal:0,min:3.17,fr:0.86,mil:2.73,hlt:9.48},
  NE:{n:"Niger",g:19.9,ag:34.5,ind:17.6,mfg:5.4,svc:45.0,oil:0.62,gas:0.03,coal:0.04,min:0.83,fr:4.89,mil:2.24,hlt:4.05},
  NG:{n:"Nigeria",g:252.3,ag:25.9,ind:18.2,mfg:8.7,svc:53.7,oil:6.25,gas:1.16,coal:0.0,min:0.01,fr:1.13,mil:0.56,hlt:4.19},
  NI:{n:"Nicaragua",g:19.7,ag:14.4,ind:27.6,mfg:13.5,svc:46.8,oil:0.02,gas:0,coal:0,min:2.68,fr:1.14,mil:0.55,hlt:8.3},
  NL:{n:"Netherlands",g:1214.9,ag:1.7,ind:17.5,mfg:10.1,svc:70.5,oil:0.02,gas:0.31,coal:0,min:0,fr:0.0,mil:1.92,hlt:10.01},
  NO:{n:"Norway",g:483.6,ag:2.1,ind:37.0,mfg:6.2,svc:51.8,oil:6.06,gas:3.94,coal:0.0,min:0,fr:0.04,mil:2.09,hlt:9.43},
  NP:{n:"Nepal",g:42.9,ag:21.9,ind:11.4,mfg:4.4,svc:55.2,oil:0,gas:0,coal:0.01,min:0,fr:0.49,mil:0.98,hlt:6.16},
  NZ:{n:"New Zealand",g:260.2,ag:4.4,ind:18.8,mfg:8.5,svc:64.6,oil:0.1,gas:0.29,coal:0.03,min:0.1,fr:0.97,mil:1.19,hlt:10.06},
  OM:{n:"Oman",g:107.1,ag:2.6,ind:54.2,mfg:10.0,svc:46.0,oil:23.54,gas:5.67,coal:0,min:0,fr:0.0,mil:5.59,hlt:3.49},
  PA:{n:"Panama",g:86.5,ag:2.7,ind:25.5,mfg:4.9,svc:69.3,oil:0,gas:0,coal:0,min:3.58,fr:0.09,mil:0,hlt:8.33},
  PE:{n:"Peru",g:289.2,ag:7.3,ind:34.0,mfg:12.1,svc:51.3,oil:0.25,gas:0.26,coal:0.0,min:12.1,fr:0.12,mil:0.91,hlt:5.64},
  PG:{n:"Papua New Guinea",g:31.8,ag:16.4,ind:35.2,mfg:1.6,svc:40.7,oil:1.88,gas:9.14,coal:0,min:14.41,fr:1.96,mil:0.31,hlt:2.87},
  PH:{n:"Philippines",g:461.6,ag:9.1,ind:27.7,mfg:15.7,svc:63.2,oil:0.03,gas:0.16,coal:0.09,min:1.52,fr:0.16,mil:1.32,hlt:5.1},
  PK:{n:"Pakistan",g:371.6,ag:23.7,ind:20.2,mfg:13.2,svc:50.7,oil:0.38,gas:0.74,coal:0.12,min:0.07,fr:0.13,mil:2.67,hlt:2.52},
  PL:{n:"Poland",g:917.8,ag:2.5,ind:27.2,mfg:16.1,svc:59.1,oil:0.04,gas:0.1,coal:0.25,min:0.48,fr:0.16,mil:4.15,hlt:8.06},
  PR:{n:"Puerto Rico (US)",g:126.0,ag:0.7,ind:47.2,mfg:44.1,svc:51.8,oil:0,gas:0,coal:0,min:0,fr:0,mil:0,hlt:0},
  PS:{n:"West Bank and Gaza",g:13.7,ag:7.4,ind:20.3,mfg:12.9,svc:76.2,oil:0,gas:0,coal:0,min:0,fr:0,mil:0,hlt:10.73},
  PT:{n:"Portugal",g:313.3,ag:2.0,ind:18.7,mfg:11.8,svc:66.3,oil:0.05,gas:0,coal:0,min:0.15,fr:0.09,mil:1.53,hlt:10.24},
  PY:{n:"Paraguay",g:44.5,ag:10.7,ind:32.5,mfg:19.0,svc:48.7,oil:0.07,gas:0,coal:0,min:0,fr:1.27,mil:0.93,hlt:8.36},
  QA:{n:"Qatar",g:219.2,ag:0.3,ind:58.2,mfg:8.1,svc:46.1,oil:15.28,gas:12.01,coal:0,min:0,fr:0.0,mil:6.5,hlt:2.52},
  RO:{n:"Romania",g:382.6,ag:2.8,ind:25.3,mfg:13.2,svc:62.6,oil:0.38,gas:0.53,coal:0.02,min:0.03,fr:0.18,mil:2.3,hlt:5.71},
  RS:{n:"Serbia",g:90.1,ag:3.2,ind:23.1,mfg:12.7,svc:58.8,oil:0.42,gas:0.1,coal:0.24,min:0.66,fr:0.33,mil:2.6,hlt:8.03},
  RU:{n:"Russian Federation",g:2173.8,ag:2.7,ind:30.7,mfg:13.3,svc:57.5,oil:9.67,gas:5.86,coal:0.61,min:2.05,fr:0.31,mil:7.05,hlt:7.04},
  RW:{n:"Rwanda",g:14.3,ag:24.6,ind:21.0,mfg:8.9,svc:47.6,oil:0,gas:0.05,coal:0,min:0,fr:3.97,mil:1.25,hlt:5.13},
  SA:{n:"Saudi Arabia",g:1239.8,ag:2.5,ind:44.9,mfg:15.7,svc:47.1,oil:23.69,gas:1.72,coal:0,min:0.16,fr:0.0,mil:7.3,hlt:5.69},
  SD:{n:"Sudan",g:49.7,ag:22.2,ind:23.2,mfg:0.0,svc:54.7,oil:3.3,gas:0,coal:0,min:6.63,fr:2.81,mil:0.93,hlt:2.85},
  SE:{n:"Sweden",g:603.7,ag:1.4,ind:21.7,mfg:13.0,svc:66.4,oil:0.03,gas:0,coal:0,min:1.0,fr:0.18,mil:2.0,hlt:11.22},
  SG:{n:"Singapore",g:547.4,ag:0.0,ind:21.4,mfg:16.3,svc:73.0,oil:0,gas:0,coal:0,min:0,fr:0.0,mil:2.84,hlt:4.49},
  SI:{n:"Slovenia",g:73.0,ag:1.5,ind:29.1,mfg:19.4,svc:57.9,oil:0.0,gas:0.0,coal:0.03,min:0,fr:0.16,mil:1.31,hlt:9.88},
  SK:{n:"Slovak Republic",g:140.9,ag:1.6,ind:28.9,mfg:16.3,svc:60.0,oil:0.0,gas:0.01,coal:0.01,min:0.01,fr:0.2,mil:2.01,hlt:7.35},
  SN:{n:"Senegal",g:32.8,ag:16.6,ind:25.0,mfg:13.9,svc:48.4,oil:0,gas:0.0,coal:0,min:2.9,fr:1.5,mil:1.57,hlt:4.32},
  SO:{n:"Somalia, Fed. Rep.",g:12.0,ag:0.0,ind:0.0,mfg:0.0,svc:0.0,oil:0,gas:0,coal:0,min:0,fr:11.24,mil:1.59,hlt:3.74},
  SV:{n:"El Salvador",g:35.4,ag:4.4,ind:22.4,mfg:12.0,svc:61.0,oil:0.0,gas:0,coal:0,min:0,fr:0.54,mil:1.19,hlt:9.29},
  SY:{n:"Syrian Arab Republic",g:23.6,ag:43.1,ind:12.0,mfg:0.0,svc:44.9,oil:4.02,gas:2.33,coal:0,min:0,fr:0.03,mil:0,hlt:2.71},
  TD:{n:"Chad",g:19.5,ag:37.7,ind:28.7,mfg:7.1,svc:29.8,oil:16.75,gas:0.01,coal:0,min:0,fr:4.58,mil:2.98,hlt:5.0},
  TG:{n:"Togo",g:10.7,ag:21.3,ind:20.4,mfg:11.4,svc:49.2,oil:0,gas:0,coal:0,min:4.88,fr:2.98,mil:2.0,hlt:6.11},
  TH:{n:"Thailand",g:526.5,ag:8.7,ind:32.1,mfg:24.3,svc:59.2,oil:0.48,gas:0.94,coal:0.03,min:0,fr:0.36,mil:1.08,hlt:4.54},
  TJ:{n:"Tajikistan",g:14.2,ag:19.7,ind:29.0,mfg:12.6,svc:29.9,oil:0.29,gas:0.17,coal:0.49,min:7.09,fr:1.01,mil:1.85,hlt:7.44},
  TM:{n:"Turkmenistan",g:51.4,ag:12.2,ind:37.5,mfg:18.0,svc:50.4,oil:0,gas:0,coal:0,min:0,fr:0,mil:0,hlt:5.5},
  TN:{n:"Tunisia",g:51.3,ag:9.7,ind:22.6,mfg:14.8,svc:62.6,oil:1.55,gas:0.49,coal:0,min:0,fr:0.21,mil:2.51,hlt:7.99},
  TR:{n:"Turkiye",g:1359.1,ag:5.8,ind:25.5,mfg:16.8,svc:57.5,oil:0.14,gas:0.01,coal:0.05,min:0.63,fr:0,mil:1.92,hlt:4.28},
  TT:{n:"Trinidad and Tobago",g:25.6,ag:0.8,ind:34.6,mfg:14.4,svc:59.2,oil:2.71,gas:5.09,coal:0,min:0,fr:0.05,mil:0.92,hlt:7.53},
  TZ:{n:"Tanzania",g:78.8,ag:23.3,ind:28.6,mfg:8.1,svc:29.6,oil:0,gas:0.22,coal:0.05,min:4.03,fr:2.39,mil:1.15,hlt:3.05},
  UA:{n:"Ukraine",g:190.7,ag:7.1,ind:19.0,mfg:8.4,svc:60.6,oil:0.28,gas:1.36,coal:0.34,min:5.32,fr:0.21,mil:34.48,hlt:8.2},
  UG:{n:"Uganda",g:53.9,ag:24.6,ind:24.9,mfg:15.1,svc:43.1,oil:0,gas:0,coal:0,min:0,fr:7.48,mil:1.88,hlt:4.24},
  US:{n:"United States",g:28751.0,ag:0.8,ind:14.5,mfg:8.7,svc:62.9,oil:0.61,gas:0.36,coal:0.17,min:0.1,fr:0.04,mil:3.42,hlt:16.69},
  UY:{n:"Uruguay",g:81.0,ag:6.4,ind:16.8,mfg:9.7,svc:65.3,oil:0.01,gas:0,coal:0,min:0.01,fr:1.91,mil:2.31,hlt:9.02},
  UZ:{n:"Uzbekistan",g:115.0,ag:18.3,ind:31.8,mfg:20.2,svc:45.2,oil:0.87,gas:11.04,coal:0.05,min:8.5,fr:0.0,mil:0,hlt:6.74},
  VE:{n:"Venezuela, RB",g:119.8,ag:0.0,ind:0.0,mfg:0.0,svc:0.0,oil:0,gas:0,coal:0,min:0,fr:0,mil:0.5,hlt:3.78},
  VN:{n:"Viet Nam",g:476.4,ag:11.9,ind:37.6,mfg:24.4,svc:42.4,oil:0.67,gas:0.33,coal:0.38,min:0.1,fr:1.07,mil:0,hlt:4.56},
  XK:{n:"Kosovo",g:11.2,ag:7.3,ind:25.8,mfg:12.6,svc:45.7,oil:0,gas:0,coal:0.38,min:0.55,fr:0,mil:1.48,hlt:0},
  ZA:{n:"South Africa",g:401.1,ag:2.8,ind:24.3,mfg:12.8,svc:63.0,oil:0.4,gas:0.03,coal:2.44,min:3.83,fr:0.63,mil:0.7,hlt:8.91},
  ZM:{n:"Zambia",g:25.3,ag:2.8,ind:35.2,mfg:9.0,svc:57.2,oil:0,gas:0,coal:0.23,min:28.25,fr:6.78,mil:1.33,hlt:5.98},
  ZW:{n:"Zimbabwe",g:41.5,ag:8.7,ind:35.0,mfg:15.6,svc:50.6,oil:0.05,gas:0,coal:0.29,min:4.24,fr:1.82,mil:0.35,hlt:2.93},
};

const BLOCS = {
  "United States": ["US"],
  "Eurozone": ["DE","FR","IT","ES","NL","BE","AT","FI","IE","PT","GR","SK","SI","LT","LV","EE","CY","MT","LU","HR"],
  "EU-27": ["DE","FR","IT","ES","NL","BE","AT","FI","IE","PT","PL","RO","CZ","SE","DK","HU","GR","BG","HR","SK","SI","LT","LV","EE","CY","MT","LU"],
  "G7": ["US","GB","DE","FR","IT","CA","JP"],
  "OECD": ["US","GB","DE","FR","IT","CA","JP","AU","KR","ES","NL","CH","SE","NO","DK","FI","AT","BE","IE","CZ","PL","PT","CL","CO","MX","TR","IL","NZ","HU","SK","SI","LT","LV","EE","IS","GR","LU","CR"],
  "China": ["CN"],
  "BRICS+": ["BR","RU","IN","CN","ZA","EG","IR","AE","SA","ET"],
  "ASEAN": ["ID","TH","MY","PH","SG","VN","MM","KH","LA","BN"],
  "North America": ["US","CA","MX"],
  "Latin America": ["BR","AR","CO","CL","EC","PE","VE","UY","PY","BO","CR","PA","DO","GT","HN","SV","NI","CU"],
  "Middle East Petrostates": ["SA","AE","KW","QA","IQ","IR","OM","BH","LY","DZ","AZ"],
};

// SAPM-calibrated βW values — © 2026 Erik Postnieks (2025-2026)
// Each beta sourced from the corresponding SAPM working paper
const SAPM_BETAS = {
  // Impossibility domains (physical floors)
  pfas: 35.2,        // PFAS / Molecular Persistence
  geneDrives: 12.4,  // Gene Drives (Impossibility)
  opioid: 10.2,      // Opioid Ecosystem
  monoculture: 8.6,  // Monoculture Agriculture (Impossibility)
  cre: 8.4,          // CRE / Urban Hollowing
  pops: 8.4,         // POPs Beyond PFAS
  dsm: 4.7,          // Deep-Sea Mining (floor 2.0)
  topsoil: 4.3,      // Topsoil Erosion (Impossibility)
  wmd: 3.0,          // WMD Capability Diffusion (estimated)
  cement: 1.35,      // Cement / Calcination Floor
  nuclear: 0.53,     // Nuclear Fission
  // Institutional PST domains
  bigTech: 7.4,      // Big Tech / Platform Monopoly
  frontierAI: 7.4,   // Frontier AI
  tobacco: 6.5,      // Tobacco
  studentLoans: 6.3, // Student Loans / For-Profit Education
  gambling: 6.3,     // Commercial Gambling
  pbm: 6.3,          // PBM Rebate System
  oilGas: 6.2,       // Oil & Gas Extraction
  palmOil: 6.2,      // Palm Oil
  upf: 6.2,          // Ultra-Processed Food
  coal: 6.1,         // Coal Combustion
  bitcoin: 5.0,      // Bitcoin (PoW)
  fisheries: 4.72,   // Global Fisheries
  aviation: 4.6,     // Aviation Emissions
  algoPricing: 4.2,  // Algorithmic Pricing
  gigEconomy: 4.2,   // Gig Economy Platforms
  water: 4.2,        // Water Privatization / Aquifer
  arms: 2.4,         // Arms Exports
  altcoins: 2.4,     // Altcoins / PoS
  amr: 2.1,          // Antimicrobial Resistance
};

// Country-level exposure for domains not in World Bank data (% of GDP)
// Sources: WHO, Euromonitor, OECD, industry reports, national statistics
const EXPOSURE = {
  // Tobacco revenue as % GDP (WHO + Euromonitor 2023)
  tob: {CN:1.2,IN:0.8,ID:1.5,US:0.35,JP:0.4,RU:0.6,BR:0.3,DE:0.25,TR:0.9,BD:0.7,PK:0.5,PH:0.8,VN:0.6,EG:0.4,TH:0.5,GB:0.2,FR:0.2,KR:0.3,MX:0.15,NG:0.3,UA:0.5,PL:0.3,IT:0.2,MY:0.4,AR:0.2,ZA:0.3,default:0.15},
  // UPF as % GDP (processed food manufacturing + retail; Euromonitor/OECD)
  upf: {US:2.8,GB:2.2,CA:2.0,AU:1.8,DE:1.5,BR:1.6,MX:1.8,FR:1.3,JP:1.4,KR:1.2,IT:1.0,CN:0.8,IN:0.5,ID:0.6,AR:1.4,CL:1.3,CO:0.9,ZA:0.8,default:0.6},
  // Gambling gross revenue as % GDP (H2 Gambling Capital 2023)
  gamb: {US:0.55,AU:1.1,GB:0.6,SG:1.8,JP:0.3,CA:0.4,IT:0.5,FR:0.35,DE:0.3,CN:0.15,KR:0.2,NZ:0.5,FI:0.4,IE:0.35,ZA:0.3,PH:0.7,BR:0.15,default:0.1},
  // Palm oil production as % GDP
  palm: {ID:2.5,MY:3.2,TH:0.4,CO:0.3,NG:0.4,GT:0.3,HN:0.5,GH:0.2,CI:0.3,CM:0.2,default:0},
  // Opioid-related economic exposure as % GDP
  opioid: {US:0.4,CA:0.15,AU:0.08,GB:0.06,DE:0.03,FR:0.02,default:0},
  // PBM/rebate system exposure (US-only institution)
  pbm: {US:0.3,default:0},
  // Student loan burden as % GDP
  sloan: {US:0.6,GB:0.15,AU:0.08,CA:0.05,NZ:0.04,default:0},
  // Aviation revenue as % GDP (ICAO/IATA 2023)
  avi: {AE:4.5,SG:3.2,IE:2.5,QA:3.0,HK:2.0,IS:2.5,TH:1.5,GB:1.2,US:0.8,FR:0.9,DE:0.7,AU:0.8,JP:0.5,NL:1.0,CH:0.6,MY:1.0,default:0.3},
  // Commercial fisheries as % GDP (World Bank/FAO)
  fish: {IS:5.0,NO:1.2,VN:2.5,MM:1.5,ID:1.0,TH:0.8,PH:0.7,PE:0.8,CL:0.5,MY:0.5,BD:1.2,SN:0.6,MR:0.5,MA:0.4,EC:0.4,CN:0.3,JP:0.2,KR:0.2,default:0.05},
  // Gig economy platform revenue as % GDP
  gig: {US:0.6,GB:0.5,AU:0.3,CA:0.3,FR:0.2,DE:0.2,IN:0.15,BR:0.15,MX:0.1,default:0.05},
  // CRE vacancy/hollowing exposure as % GDP
  cre: {US:0.8,GB:0.5,DE:0.4,FR:0.3,JP:0.3,CN:0.2,CA:0.5,AU:0.4,default:0.1},
  // Water privatization exposure as % GDP
  water: {GB:0.3,FR:0.25,CL:0.2,US:0.1,AU:0.1,default:0.02},
};

function getExposure(code, domain) {
  const d = EXPOSURE[domain];
  if (!d) return 0;
  return d[code] !== undefined ? d[code] : (d.default || 0);
}

function compute(c, mu, code) {
  const g = c.g;
  const channels = [
    // Tier 1: Direct World Bank data with SAPM-calibrated betas
    { name: "Oil & Gas", pct: c.oil + c.gas, beta: SAPM_BETAS.oilGas },
    { name: "Coal", pct: c.coal, beta: SAPM_BETAS.coal },
    { name: "Mining & Rare Earth", pct: c.min, beta: SAPM_BETAS.dsm },
    { name: "Deforestation/Forestry", pct: c.fr, beta: SAPM_BETAS.topsoil },
    { name: "Arms & Defense", pct: c.mil, beta: SAPM_BETAS.arms },
    { name: "Monoculture Agriculture", pct: c.ag * 0.5, beta: SAPM_BETAS.monoculture },
    { name: "Topsoil Erosion", pct: c.ag * 0.3, beta: SAPM_BETAS.topsoil },
    { name: "Cement & Materials", pct: c.mfg * 0.08, beta: SAPM_BETAS.cement },
    { name: "Chemical/POPs", pct: c.mfg * 0.05, beta: SAPM_BETAS.pops },
    { name: "PFAS Exposure", pct: c.mfg * 0.02, beta: SAPM_BETAS.pfas },
    { name: "Big Tech/Platform", pct: Math.min(c.svc * 0.05, 5), beta: SAPM_BETAS.bigTech },
    { name: "Frontier AI", pct: Math.min(c.svc * 0.02, 2), beta: SAPM_BETAS.frontierAI },
    { name: "Algorithmic Pricing", pct: Math.min(c.svc * 0.02, 2), beta: SAPM_BETAS.algoPricing },
    { name: "Nuclear", pct: c.mfg * 0.01, beta: SAPM_BETAS.nuclear },
    // Tier 2: SAPM-calibrated domains with country exposure data
    { name: "Tobacco", pct: getExposure(code, "tob"), beta: SAPM_BETAS.tobacco },
    { name: "Ultra-Processed Food", pct: getExposure(code, "upf"), beta: SAPM_BETAS.upf },
    { name: "Opioid Ecosystem", pct: getExposure(code, "opioid"), beta: SAPM_BETAS.opioid },
    { name: "PBM Rebate System", pct: getExposure(code, "pbm"), beta: SAPM_BETAS.pbm },
    { name: "Gambling", pct: getExposure(code, "gamb"), beta: SAPM_BETAS.gambling },
    { name: "Palm Oil", pct: getExposure(code, "palm"), beta: SAPM_BETAS.palmOil },
    { name: "Aviation Emissions", pct: getExposure(code, "avi"), beta: SAPM_BETAS.aviation },
    { name: "Fisheries", pct: getExposure(code, "fish"), beta: SAPM_BETAS.fisheries },
    { name: "Student Loans", pct: getExposure(code, "sloan"), beta: SAPM_BETAS.studentLoans },
    { name: "Gig Economy", pct: getExposure(code, "gig"), beta: SAPM_BETAS.gigEconomy },
    { name: "Water Privatization", pct: getExposure(code, "water"), beta: SAPM_BETAS.water },
    { name: "CRE/Urban Hollowing", pct: getExposure(code, "cre"), beta: SAPM_BETAS.cre },
    { name: "AMR", pct: Math.min(c.hlt * 0.05, 0.5), beta: SAPM_BETAS.amr },
  ];
  let loss = 0;
  const bd = [];
  for (const ch of channels) {
    if (ch.pct <= 0) continue;
    const sg = g * ch.pct / 100;
    const l = mu * ch.beta * sg * 0.15;
    loss += l;
    if (l > 0.05) bd.push({ ...ch, gdp: sg, loss: l });
  }
  return { conv: g, adj: g - loss, loss, pct: loss / g * 100, bd: bd.sort((a, b) => b.loss - a.loss) };
}

const fmt = n => n >= 1000 ? `$${(n/1000).toFixed(1)}T` : n >= 1 ? `$${n.toFixed(0)}B` : `$${(n*1000).toFixed(0)}M`;
const pc = n => `${n.toFixed(1)}%`;
const M = "'JetBrains Mono',monospace";
const S = "'Newsreader',serif";

function Stat({l,v,s,color="#F59E0B"}) {
  return <div style={{flex:1,minWidth:170,padding:"14px 18px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:4}}>
    <div style={{fontFamily:M,fontSize: 12,letterSpacing:"0.1em",color:"rgba(255,255,255,0.35)",textTransform:"uppercase",marginBottom:6}}>{l}</div>
    <div style={{fontFamily:M,fontSize: 21,fontWeight:600,color,letterSpacing:"-0.02em"}}>{v}</div>
    {s&&<div style={{fontFamily:M,fontSize: 13,color:"rgba(255,255,255,0.3)",marginTop:3}}>{s}</div>}
  </div>;
}

function computeBloc(codes, mu) {
  let conv=0, adj=0, loss=0;
  let members=0;
  for (const c of codes) {
    if (!RAW[c]) continue;
    const r = compute(RAW[c], mu, c);
    conv += r.conv; adj += r.adj; loss += r.loss;
    members++;
  }
  return { conv, adj, loss, pct: conv > 0 ? loss/conv*100 : 0, members };
}

export default function App() {
  const [tab,setTab]=useState("ranking");
  const [sel,setSel]=useState("US");
  const [mu,setMu]=useState(1.0);
  const [sort,setSort]=useState("adj");
  const [blocLeft,setBlocLeft]=useState("United States");
  const [blocRight,setBlocRight]=useState("Eurozone");
  const [chartMode,setChartMode]=useState("countries");

  const all=useMemo(()=>Object.entries(RAW).map(([code,c])=>({code,name:c.n,...compute(c,mu,code)})).sort((a,b)=>sort==="pct"?b.pct-a.pct:b.adj-a.adj),[mu,sort]);

  const blocData=useMemo(()=>Object.entries(BLOCS).map(([name,codes])=>({name,code:name,...computeBloc(codes,mu)})).sort((a,b)=>sort==="pct"?b.pct-a.pct:b.adj-a.adj),[mu,sort]);
  const bL=useMemo(()=>computeBloc(BLOCS[blocLeft]||[],mu),[blocLeft,mu]);
  const bR=useMemo(()=>computeBloc(BLOCS[blocRight]||[],mu),[blocRight,mu]);

  const us=useMemo(()=>computeBloc(["US"],mu),[mu]);
  const ez=useMemo(()=>computeBloc(BLOCS["Eurozone"],mu),[mu]);
  const cn=useMemo(()=>computeBloc(["CN"],mu),[mu]);
  const leader=useMemo(()=>{
    const trio=[{n:"US",v:us.adj},{n:"EUROZONE",v:ez.adj},{n:"CHINA",v:cn.adj}];
    trio.sort((a,b)=>b.v-a.v);
    return trio;
  },[us,ez,cn]);

  const tabs=[{id:"ranking",l:"Ranking"},{id:"chart",l:"Chart"},{id:"blocs",l:"Blocs"},{id:"drill",l:"Drill Down"},{id:"methods",l:"Methods"}];
  const selC=RAW[sel];
  const selR=useMemo(()=>selC?compute(selC,mu,sel):null,[selC,mu,sel]);

  return <div style={{fontFamily:S,background:"#0D0D0D",color:"#F5F0E8",minHeight:"100vh",maxWidth:1000,margin:"0 auto",padding:"0 24px 60px"}}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@300;400;500;600&display=swap');`}</style>

    <header style={{padding:"40px 0 24px",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
      <div style={{fontFamily:M,fontSize: 12,letterSpacing:"0.12em",color:"#F59E0B",marginBottom:12,textTransform:"uppercase"}}>C-Adjusted GDP Explorer · {Object.keys(RAW).length} Countries · World Bank Data</div>
      <h1 style={{fontSize: 28,fontWeight:400,margin:0,lineHeight:1.25,letterSpacing:"-0.02em"}}>What Is the World Actually Earning?</h1>
      <p style={{fontSize: 17,color:"rgba(255,255,255,0.4)",margin:"8px 0 0",fontStyle:"italic"}}>C-Adjusted GDP Using the System Asset Pricing Model</p>
      <div style={{fontFamily:M,fontSize: 13,color:"rgba(255,255,255,0.25)",marginTop:12}}>Erik Postnieks · Postnieks (2026a) · github.com/epostnieks/c-adjusted-gdp</div>
    </header>

    {leader[0].n!=="US"&&<div style={{margin:"16px 0 0",padding:"10px 18px",background:"rgba(34,197,94,0.08)",border:"1px solid rgba(34,197,94,0.25)",borderRadius:4,fontFamily:M,fontSize: 15,fontWeight:600,color:"#22C55E",letterSpacing:"0.02em"}}>
      {leader[0].n} EXCEEDS {leader[1].n} ON C-ADJUSTED GDP — {fmt(leader[0].v)} vs {fmt(leader[1].v)}
    </div>}

    <div style={{margin:"16px 0 24px"}}>
      <div style={{fontFamily:M,fontSize: 12,letterSpacing:"0.1em",color:"rgba(255,255,255,0.35)",textTransform:"uppercase",marginBottom:8}}>Bloc Comparison</div>
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:200}}>
          <select value={blocLeft} onChange={e=>setBlocLeft(e.target.value)} style={{fontFamily:M,fontSize: 13,padding:"6px 10px",background:"#1A1A1A",color:"#F5F0E8",border:"1px solid rgba(255,255,255,0.1)",borderRadius:4,marginBottom:8,width:"100%",cursor:"pointer"}}>
            {Object.keys(BLOCS).map(b=><option key={b} value={b}>{b}</option>)}
          </select>
          <div style={{display:"flex",gap:8}}>
            <Stat l="Conv. GDP" v={fmt(bL.conv)} color="rgba(255,255,255,0.5)"/>
            <Stat l="C-Adjusted" v={fmt(bL.adj)} color={bL.adj>=bR.adj?"#22C55E":"#F59E0B"} s={`HW: ${pc(bL.pct)}`}/>
          </div>
        </div>
        <div style={{flex:1,minWidth:200}}>
          <select value={blocRight} onChange={e=>setBlocRight(e.target.value)} style={{fontFamily:M,fontSize: 13,padding:"6px 10px",background:"#1A1A1A",color:"#F5F0E8",border:"1px solid rgba(255,255,255,0.1)",borderRadius:4,marginBottom:8,width:"100%",cursor:"pointer"}}>
            {Object.keys(BLOCS).map(b=><option key={b} value={b}>{b}</option>)}
          </select>
          <div style={{display:"flex",gap:8}}>
            <Stat l="Conv. GDP" v={fmt(bR.conv)} color="rgba(255,255,255,0.5)"/>
            <Stat l="C-Adjusted" v={fmt(bR.adj)} color={bR.adj>=bL.adj?"#22C55E":"#F59E0B"} s={`HW: ${pc(bR.pct)}`}/>
          </div>
        </div>
      </div>
    </div>

    <div style={{margin:"24px 0",padding:"14px 18px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:4}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
        <span style={{fontFamily:M,fontSize: 12,letterSpacing:"0.1em",color:"rgba(255,255,255,0.4)",textTransform:"uppercase"}}>Shadow Price (μ)</span>
        <span style={{fontFamily:M,fontSize: 18,fontWeight:600,color:"#F59E0B"}}>{mu.toFixed(2)}</span>
      </div>
      <input type="range" min={0} max={2} step={0.01} value={mu} onChange={e=>setMu(parseFloat(e.target.value))} style={{width:"100%",accentColor:"#F59E0B"}}/>
      <div style={{display:"flex",justifyContent:"space-between",fontFamily:M,fontSize: 12,color:"rgba(255,255,255,0.2)",marginTop:4}}>
        <span>μ=0</span><span>μ=1.0 (full social cost)</span><span>μ=2.0</span>
      </div>
    </div>

    <nav style={{display:"flex",gap:0,borderBottom:"1px solid rgba(255,255,255,0.06)",marginBottom:24,position:"sticky",top:0,background:"#0D0D0D",zIndex:10,paddingTop:8}}>
      {tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{fontFamily:M,fontSize: 13,letterSpacing:"0.04em",color:tab===t.id?"#F59E0B":"rgba(255,255,255,0.35)",background:"none",border:"none",cursor:"pointer",padding:"12px 16px",borderBottom:tab===t.id?"2px solid #F59E0B":"2px solid transparent"}}>{t.l}</button>)}
      {tab==="ranking"&&<div style={{marginLeft:"auto",display:"flex",gap:8,alignItems:"center"}}>
        <button onClick={()=>setSort("adj")} style={{fontFamily:M,fontSize: 12,color:sort==="adj"?"#F59E0B":"rgba(255,255,255,0.3)",background:"none",border:"none",cursor:"pointer"}}>by GDP</button>
        <button onClick={()=>setSort("pct")} style={{fontFamily:M,fontSize: 12,color:sort==="pct"?"#F59E0B":"rgba(255,255,255,0.3)",background:"none",border:"none",cursor:"pointer"}}>by HW%</button>
      </div>}
    </nav>

    {tab==="ranking"&&<div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontFamily:M,fontSize: 13}}>
      <thead><tr style={{borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
        {["#","Country","Conv. GDP","C-Adj GDP","Hollow Win","HW %"].map(h=><th key={h} style={{textAlign:h==="Country"?"left":"right",padding:"8px 10px",color:"rgba(255,255,255,0.4)",fontWeight:400,fontSize: 12,letterSpacing:"0.06em",textTransform:"uppercase"}}>{h === "βW" ? <span>β<sub>W</sub></span> : h}</th>)}
      </tr></thead>
      <tbody>{all.map((d,i)=><tr key={d.code} style={{borderBottom:"1px solid rgba(255,255,255,0.03)",background:d.code==="US"?"rgba(245,158,11,0.04)":"transparent"}}>
        <td style={{padding:"5px 10px",textAlign:"right",color:"rgba(255,255,255,0.3)"}}>{i+1}</td>
        <td style={{padding:"5px 10px",color:"#F5F0E8",cursor:"pointer",textDecoration:"underline",textDecorationColor:"rgba(255,255,255,0.1)"}} onClick={()=>{setSel(d.code);setTab("drill")}}>{d.name}</td>
        <td style={{padding:"5px 10px",textAlign:"right",color:"rgba(255,255,255,0.5)"}}>{fmt(d.conv)}</td>
        <td style={{padding:"5px 10px",textAlign:"right",color:"#F59E0B",fontWeight:600}}>{fmt(d.adj)}</td>
        <td style={{padding:"5px 10px",textAlign:"right",color:"#EF4444"}}>{fmt(d.loss)}</td>
        <td style={{padding:"5px 10px",textAlign:"right",fontWeight:600,color:d.pct>25?"#EF4444":d.pct>15?"#F59E0B":"#22C55E"}}>{pc(d.pct)}</td>
      </tr>)}</tbody>
    </table></div>}

    {tab==="chart"&&<div>
      <div style={{display:"flex",gap:0,marginBottom:16}}>
        {["countries","blocs"].map(m=><button key={m} onClick={()=>setChartMode(m)} style={{fontFamily:M,fontSize: 12,letterSpacing:"0.06em",color:chartMode===m?"#0D0D0D":"rgba(255,255,255,0.4)",background:chartMode===m?"#F59E0B":"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",cursor:"pointer",padding:"6px 14px",borderRadius:m==="countries"?"4px 0 0 4px":"0 4px 4px 0",textTransform:"capitalize"}}>{m}</button>)}
      </div>
      {chartMode==="countries"?<ResponsiveContainer width="100%" height={Math.max(500,25*22)}>
        <BarChart data={all.slice(0,25)} layout="vertical" margin={{left:130,right:20,top:10,bottom:10}}>
          <XAxis type="number" tickFormatter={fmt} tick={{fill:"rgba(255,255,255,0.3)",fontFamily:M,fontSize: 12}} axisLine={{stroke:"rgba(255,255,255,0.06)"}}/>
          <YAxis type="category" dataKey="name" tick={{fill:"#F5F0E8",fontFamily:M,fontSize: 12}} axisLine={false} tickLine={false} width={125}/>
          <Tooltip contentStyle={{background:"#1A1A1A",border:"1px solid rgba(255,255,255,0.1)",borderRadius:4,fontFamily:M,fontSize: 13}} formatter={(v,n)=>[fmt(v),n==="adj"?"C-Adjusted":"Conventional"]}/>
          <Bar dataKey="conv" fill="rgba(255,255,255,0.06)" radius={[0,2,2,0]} name="Conventional"/>
          <Bar dataKey="adj" radius={[0,2,2,0]} name="C-Adjusted">{all.slice(0,25).map((d,i)=><Cell key={i} fill={d.pct>25?"#EF4444":d.pct>15?"#F59E0B":"#22C55E"} fillOpacity={0.65}/>)}</Bar>
        </BarChart>
      </ResponsiveContainer>
      :<ResponsiveContainer width="100%" height={Math.max(400,blocData.length*36)}>
        <BarChart data={blocData} layout="vertical" margin={{left:170,right:20,top:10,bottom:10}}>
          <XAxis type="number" tickFormatter={fmt} tick={{fill:"rgba(255,255,255,0.3)",fontFamily:M,fontSize: 12}} axisLine={{stroke:"rgba(255,255,255,0.06)"}}/>
          <YAxis type="category" dataKey="name" tick={{fill:"#F5F0E8",fontFamily:M,fontSize: 12}} axisLine={false} tickLine={false} width={165}/>
          <Tooltip contentStyle={{background:"#1A1A1A",border:"1px solid rgba(255,255,255,0.1)",borderRadius:4,fontFamily:M,fontSize: 13}} formatter={(v,n)=>[fmt(v),n==="adj"?"C-Adjusted":"Conventional"]}/>
          <Bar dataKey="conv" fill="rgba(255,255,255,0.06)" radius={[0,2,2,0]} name="Conventional"/>
          <Bar dataKey="adj" radius={[0,2,2,0]} name="C-Adjusted">{blocData.map((d,i)=><Cell key={i} fill={d.pct>25?"#EF4444":d.pct>15?"#F59E0B":"#22C55E"} fillOpacity={0.65}/>)}</Bar>
        </BarChart>
      </ResponsiveContainer>}
    </div>}

    {tab==="blocs"&&<div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontFamily:M,fontSize: 13}}>
      <thead><tr style={{borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
        {["#","Bloc","Members","Conv. GDP","C-Adj GDP","Hollow Win","HW %"].map(h=><th key={h} style={{textAlign:h==="Bloc"?"left":"right",padding:"8px 10px",color:"rgba(255,255,255,0.4)",fontWeight:400,fontSize: 12,letterSpacing:"0.06em",textTransform:"uppercase"}}>{h === "βW" ? <span>β<sub>W</sub></span> : h}</th>)}
      </tr></thead>
      <tbody>{blocData.map((d,i)=><tr key={d.name} style={{borderBottom:"1px solid rgba(255,255,255,0.03)",background:d.name==="United States"?"rgba(245,158,11,0.04)":"transparent"}}>
        <td style={{padding:"5px 10px",textAlign:"right",color:"rgba(255,255,255,0.3)"}}>{i+1}</td>
        <td style={{padding:"5px 10px",color:"#F5F0E8",fontWeight:500}}>{d.name}</td>
        <td style={{padding:"5px 10px",textAlign:"right",color:"rgba(255,255,255,0.35)"}}>{d.members}</td>
        <td style={{padding:"5px 10px",textAlign:"right",color:"rgba(255,255,255,0.5)"}}>{fmt(d.conv)}</td>
        <td style={{padding:"5px 10px",textAlign:"right",color:"#F59E0B",fontWeight:600}}>{fmt(d.adj)}</td>
        <td style={{padding:"5px 10px",textAlign:"right",color:"#EF4444"}}>{fmt(d.loss)}</td>
        <td style={{padding:"5px 10px",textAlign:"right",fontWeight:600,color:d.pct>25?"#EF4444":d.pct>15?"#F59E0B":"#22C55E"}}>{pc(d.pct)}</td>
      </tr>)}</tbody>
    </table></div>}

    {tab==="drill"&&selR&&<div>
      <select value={sel} onChange={e=>setSel(e.target.value)} style={{fontFamily:M,fontSize: 15,padding:"8px 12px",background:"#1A1A1A",color:"#F5F0E8",border:"1px solid rgba(255,255,255,0.1)",borderRadius:4,marginBottom:20,cursor:"pointer"}}>
        {Object.entries(RAW).sort((a,b)=>b[1].g-a[1].g).map(([c,d])=><option key={c} value={c}>{d.n} ({fmt(d.g)})</option>)}
      </select>
      <div style={{display:"flex",gap:12,marginBottom:24,flexWrap:"wrap"}}>
        <Stat l="Conventional" v={fmt(selR.conv)} color="rgba(255,255,255,0.6)"/>
        <Stat l="C-Adjusted" v={fmt(selR.adj)}/>
        <Stat l="Hollow Win" v={fmt(selR.loss)} color="#EF4444" s={pc(selR.pct)+" of GDP"}/>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",fontFamily:M,fontSize: 13}}>
        <thead><tr style={{borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
          {["PST Channel","% GDP","Sector GDP","βW","Loss"].map(h=><th key={h} style={{textAlign:h==="PST Channel"?"left":"right",padding:"8px 10px",color:"rgba(255,255,255,0.4)",fontWeight:400,fontSize: 12,letterSpacing:"0.06em",textTransform:"uppercase"}}>{h === "βW" ? <span>β<sub>W</sub></span> : h}</th>)}
        </tr></thead>
        <tbody>{selR.bd.map(ch=><tr key={ch.name} style={{borderBottom:"1px solid rgba(255,255,255,0.03)"}}>
          <td style={{padding:"5px 10px",color:"#F5F0E8"}}>{ch.name}</td>
          <td style={{padding:"5px 10px",textAlign:"right",color:"rgba(255,255,255,0.5)"}}>{pc(ch.pct)}</td>
          <td style={{padding:"5px 10px",textAlign:"right",color:"rgba(255,255,255,0.5)"}}>{fmt(ch.gdp)}</td>
          <td style={{padding:"5px 10px",textAlign:"right",color:"#F59E0B"}}>{ch.beta.toFixed(1)}</td>
          <td style={{padding:"5px 10px",textAlign:"right",color:"#EF4444",fontWeight:600}}>{fmt(ch.loss)}</td>
        </tr>)}</tbody>
      </table>
    </div>}

    {tab==="methods"&&<div style={{fontSize: 17,lineHeight:1.8,color:"rgba(255,255,255,0.6)"}}>
      <h2 style={{fontSize: 20,fontWeight:400,color:"#F5F0E8",marginBottom:16}}>Methodology</h2>
      <p><strong style={{color:"#F5F0E8"}}>Data:</strong> World Bank WDI. GDP, sector value-added, resource rents, military and health expenditure as % of GDP. {Object.keys(RAW).length} countries.</p>
      <p><strong style={{color:"#F5F0E8"}}>PST mapping:</strong> World Bank sectors mapped to PST domains via resource rent indicators, military expenditure, and health expenditure. Decomposition ratios are preliminary — each SAPM paper refines the mapping.</p>
      <p><strong style={{color:"#F5F0E8"}}>β<sub>W</sub>:</strong> Calibrated from SAPM papers where available. Placeholder estimates for domains in progress. Updates automatically as papers publish.</p>
      <p><strong style={{color:"#F5F0E8"}}>C-adjustment:</strong> loss = μ × βW × sector_GDP × 0.01. Shadow price μ adjustable via slider.</p>
      <p><strong style={{color:"#F5F0E8"}}>Limitations:</strong> Sector decomposition ratios are estimated, not calibrated. βW values for uncalibrated domains are placeholders. Fork the repo and contest any parameter.</p>
      <div style={{marginTop:32,padding:20,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:4}}>
        <div style={{fontFamily:M,fontSize: 12,letterSpacing:"0.1em",color:"#F59E0B",textTransform:"uppercase",marginBottom:8}}>Citation</div>
        <p style={{fontFamily:M,fontSize: 14,color:"rgba(255,255,255,0.5)",margin:0}}>Postnieks, E. (2026). "What Is the World Actually Earning? C-Adjusted GDP Across 190 Countries." Working Paper. github.com/epostnieks/c-adjusted-gdp</p>
      </div>
    </div>}

    <footer style={{padding:"32px 0",marginTop:48,borderTop:"1px solid rgba(255,255,255,0.06)"}}>
      <div style={{fontFamily:M,fontSize: 12,color:"rgba(255,255,255,0.15)",lineHeight:1.8}}>
        <div>C-Adjusted GDP Explorer · Erik Postnieks · github.com/epostnieks/c-adjusted-gdp</div>
        <div>Private Pareto Theorem (Postnieks, 2026a) · SAPM · World Bank WDI</div>
        <div>Every parameter contestable. Fork the repo. Change a βW. The instrument is the argument.</div>
      </div>
    </footer>
  <SAPMNav />
      </div>;
}
