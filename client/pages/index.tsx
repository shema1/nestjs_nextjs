import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { RouteGuard } from '../components/RouteGuard';
import { io } from "socket.io-client";
import { Button } from "@mui/material";
const ENDPOINT = "http://localhost:5000/";

const Index = () => {
  return (
    <MainLayout >
      <div >
        Home Page
      </div>
    </MainLayout>
  )
}

export default Index

