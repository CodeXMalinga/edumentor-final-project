"use client";

import { FormEvent } from 'react'

import Head from "next/head";
import Image from "next/image";
import PaymentModal from "./paymentmodel";
import md5 from 'crypto-js/md5';

export default function PaymentPage() {

  let merchantSecret  = 'MzI4NTU4MzAzNjcyMjMwNjQ5NjM0NTM4NTUxNDE0MTc2MjUzNjM=';
let merchantId      = '1225153';
let orderId         = '12345';
let amount          = 1000;
let hashedSecret    = md5(merchantSecret).toString().toUpperCase();
let amountFormated  = parseFloat( amount ).toLocaleString( 'en-us', { minimumFractionDigits : 2 } ).replaceAll(',', '');
let currency        = 'LKR';
let hash            = md5(merchantId + orderId + amountFormated + currency + hashedSecret).toString().toUpperCase();

console.log("Hash code - " + hash);


return (
  <form method="post" action="https://sandbox.payhere.lk/pay/checkout">
    <input type="hidden" name="merchant_id" value="1225153" />
    <input type="hidden" name="return_url" value="http://localhost:3000/bookings" />
    <input type="hidden" name="cancel_url" value="http://sample.com/cancel" />
    <input type="hidden" name="notify_url" value="http://sample.com/notify" />
    <br /><br />Item Details<br />
    <input type="text" name="order_id" value="12345" />
    <input type="text" name="items" value="Door bell wireless" />
    <input type="text" name="currency" value="LKR" />
    <input type="text" name="amount" value="1000" />
    <br /><br />Customer Details<br />
    <input type="text" name="first_name" value="Saman" />
    <input type="text" name="last_name" value="Perera" />
    <input type="text" name="email" value="samanp@gmail.com" />
    <input type="text" name="phone" value="0771234567" />
    <input type="text" name="address" value="No.1, Galle Road" />
    <input type="text" name="city" value="Colombo" />
    <input type="hidden" name="country" value="Sri Lanka" />
    <input type="hidden" name="hash" value={hash} />
    <input type="submit" value="Buy Now" />
  </form>
);

}