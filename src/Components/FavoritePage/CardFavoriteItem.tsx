import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import { useNavigate} from "react-router-dom"

type Props={
    productID: number,
    name: string,
    price: number
}

export function CardFavoriteItem(props:Props) {
    const [userId, setUserId] = React.useState<any>();
    const [loading, setLoading] = React.useState(false);
    const [loadingFav, setLoadingFav] = React.useState(false);
    const [isInCart, setIsInCart] = React.useState(false);
    const navigate = useNavigate();

    function getCookie() {
        function escape(s:any) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
        var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape('freshMartUserId') + '=([^;]*)'));
        return match ? match[1] : null;
    }

    useEffect(() => {
        let cookie = getCookie();
        setUserId(cookie);

        fetch(process.env.REACT_APP_API_BASE+"/users/details/"+cookie)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data[0].shoppingCart.cartItems);
                data.data[0].shoppingCart.cartItems.forEach((e:any) => {
                if(props.productID == e.product.productId){
                    setIsInCart(true);
                }
                });
        })
    },[]);

    function addToCart(e:any){
        e.stopPropagation();
        if(!isInCart && !loading){
          setLoading(true);
          let data:any = {};
          data["userId"] = userId;
          data["productId"] = Number(props.productID);
          data["quantity"] = 1;
    
          fetch(process.env.REACT_APP_API_BASE+"/cart/", {
              method: 'POST',
              body: JSON.stringify(data),
              headers: {
                  'Content-Type': 'application/json'
              },
              credentials: 'include'
          }).then((response) => {
              response.json().then((body) => {
              if(body.statusCode === 500) {
                  return;
              }else{
                console.log("flag");
                  setLoading(false);
                  setIsInCart(true);   
              }
              });
          })
        }   
    }

    function removeFromFavorites(e:any){
        e.stopPropagation();
        if(!loadingFav){
          setLoadingFav(true);
          let data:any = {};
          data["userId"] = userId;
          data["productId"] = Number(props.productID);
    
          fetch(process.env.REACT_APP_API_BASE+"/favorite/remove", {
              method: 'POST',
              body: JSON.stringify(data),
              headers: {
                  'Content-Type': 'application/json'
              },
              credentials: 'include'
          }).then((response) => {
              response.json().then((body) => {
              if(body.statusCode === 500) {
                  return;
              }else{
                  setLoadingFav(false);
                  window.location.reload();
              }
              });
          })
        }   
    }

    function goToProductPage(){
        navigate('/product/'+props.productID);
    }
    return (
        <div className="px-5 divide-gray cursor-pointer" onClick={goToProductPage}>
            <div className="flex space-between ">
                <div className="flex w-1/3 items-center">
                    <div className="flex-1 ">
                        <img src={"https://source.unsplash.com/100x120/?" + props.name + " fruit"} alt="" />
                    </div>
                    <div className="flex-1">
                        <p className="font-bold text-lg">{props.name}</p>
                    </div>
                </div>
                <div className="flex w-1/3 text-right items-center">
                    <div className="flex-auto text-center">
                        <p className="font-bold text-sm">Price</p>
                        <p>{props.price}</p>
                    </div>
                </div>
                <div className="flex w-1/3 text-right">
                    <div className="grid grid-cols-2 gap-3 flex-auto items-center">
                        <button className="px-3 py-2 bg-red-600 text-white text-xs font-bold uppercase rounded" onClick={(event) => removeFromFavorites(event)}>
                            {loadingFav ? <FontAwesomeIcon icon={faSpinner} spinPulse={true} color={'white'} size={"1x"} /> :  "Remove"}
                        </button>
                        <button className="px-3 py-2 bg-green text-white text-xs font-bold uppercase rounded" onClick={(event) => addToCart(event)}>
                            {loading ? <FontAwesomeIcon icon={faSpinner} spinPulse={true} color={'white'} size={"1x"} /> : isInCart ? "In Cart" : "Add To Cart"}
                        </button>
                    </div>
                </div>
            </div>
            <hr className="my-2"></hr>
        </div>     
    )
}