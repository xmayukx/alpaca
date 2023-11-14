"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";

type Props = {
  isPro: boolean;
};

const SubscriptionButton = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const handleSubscription = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      console.log(response.data);
      window.location.href = response.data.url;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button variant={"outline"} disabled={loading} onClick={handleSubscription}>
      {props.isPro ? " Manage Subscription 🪄" : "Get Alpaca Pro 🚀"}
    </Button>
  );
};

export default SubscriptionButton;
