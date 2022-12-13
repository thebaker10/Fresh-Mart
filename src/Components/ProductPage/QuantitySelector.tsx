import { IconItem } from "../Nav/IconItem";
import {faPlus, faMinus, faHeartCirclePlus, faHeartCircleMinus, faSpinner} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";

type Props={
  price: number,
  productID: number
}

export function QuantitySelector(props:Props) {
    let [count, setCount] = useState<number>(1);

    const [alertVisible, setAlertVisible] = React.useState(false);
    const [userId, setUserId] = React.useState<any>();
    const [loading, setLoading] = React.useState(false);
    const [isInCart, setIsInCart] = React.useState(false);
    const [isInFavorite, setIsInFavorite] = React.useState(false);
    const [loadingFav, setLoadingFav] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('Something went wrong while adding product to cart.');

    function getCookie() {
      function escape(s:any) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
      var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape('freshMartUserId') + '=([^;]*)'));
      return match ? match[1] : null;
    }
    

    useEffect(() => {
      let cookie = getCookie();
      if(cookie != null){
        setUserId(cookie);
        fetch(process.env.REACT_APP_API_BASE+"/users/details/"+cookie)
            .then((response) => response.json())
            .then((data) => {
              data.data[0].shoppingCart.cartItems.forEach((e:any) => {
                if(props.productID == e.product.productId){
                  setIsInCart(true);
                }
              });
              data.data[0].favorites.favoriteItems.forEach((e:any) => {
                if(props.productID == e.product.productId){
                  setIsInFavorite(true);
                }
              });
        })
      }
    },[]);

    function addToCart(){
      if(userId == null){
        loginAlert();
      }
      else if(!isInCart && !loading){
        setLoading(true);
        let data:any = {};
        data["userId"] = userId;
        data["productId"] = Number(props.productID);
        data["quantity"] = count;

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
                setAlertVisible(true);
                return;
            }else{
                setLoading(false);
                setIsInCart(true);
                setAlertVisible(false);
            }
            });
        }).catch((error) => {
            setAlertVisible(true);
        });
      }   
    }

    function addToFavorites(){
      if(userId == null){
        loginAlert();
      }
      else if(!isInFavorite && !loadingFav){
        setLoadingFav(true);
        let data:any = {};
        data["userId"] = userId;
        data["productId"] = Number(props.productID);

        fetch(process.env.REACT_APP_API_BASE+"/favorite/", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then((response) => {
            response.json().then((body) => {
            if(body.statusCode === 500) {
                setAlertVisible(true);
                return;
            }else{
                setLoadingFav(false);
                setIsInFavorite(true);
                setAlertVisible(false);
            }
            });
        }).catch((error) => {
            setAlertVisible(true);
        });
      }else if(isInFavorite){
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
                  setIsInFavorite(false);
              }
              });
          })
      }   
    }

    function incNumber(){
      count++;
      setCount(count);
    }
    
    function decNumber(){
      if(count != 1){
        count--;
        setCount(count);
      }
    }

    function loginAlert(){
      setAlertMessage("You must be logged in")
      setAlertVisible(true);
    }

    return (
    <div>
        { alertVisible && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{alertMessage}</div> }
        <div className="flex gap-1 flex-row justify-center items-center">
          <button className="px-1 py-2  font-bold uppercase rounded" onClick={decNumber}><ul><IconItem icon={faMinus} /></ul></button>
          <input className="text-gray-900 text-2xl font-bold text-center bg-lightGray" type="text" id="qty" name="qty" size={3} maxLength={3} value={count}></input>
          <button className="px-1 py-2  font-bold uppercase rounded" onClick={incNumber}><ul><IconItem icon={faPlus} /></ul></button>
        </div>
      <p className="text-center text-2xl">${(props.price * count).toFixed(2)}</p>
      <div className="flex gap-1 flex-row justify-center items-center">
        <button onClick={addToCart} className="px-3 py-3 bg-green w-full text-white text-xs font-bold uppercase rounded">{loading ? <FontAwesomeIcon icon={faSpinner} spinPulse={true} color={'white'} size={"1x"} /> : isInCart ? "In Cart" : "Add To Cart"}</button>
        <ul>
          <button  onClick={addToFavorites} className={isInFavorite ? "bg-[red] px-2 pt-2 text-white text-xs font-bold uppercase rounded min-h-[40px] min-w-[45px]":"bg-green px-2 pt-2 text-white text-xs font-bold uppercase rounded min-h-[40px] min-w-[45px]"}>
            {loadingFav ? <FontAwesomeIcon icon={faSpinner} spinPulse={true} color={'white'} size={"2x"} /> : isInFavorite ?<IconItem color = {"black"} icon={faHeartCircleMinus}/> : <IconItem color = {"white"} icon={faHeartCirclePlus} />}
          </button>
        </ul>
      </div>
    </div>
               
    )
}

