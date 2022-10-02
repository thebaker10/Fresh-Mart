import { IconItem } from "../Nav/IconItem";
import {faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";



export function QuantitySelector() {
    return (
    <div className="flex gap-1 flex-row  justify-center items-center">
      <button className="px-1 py-2  font-bold uppercase rounded" onClick={decNumber}><ul><IconItem icon={faMinus} /></ul></button>
      <input className="text-gray-900 text-2xl font-bold text-center bg-white" type="text" id="qty" name="qty" size={3} maxLength={3} value={1}></input>
      <button className="px-1 py-2  font-bold uppercase rounded" onClick={incNumber}><ul><IconItem icon={faPlus} /></ul></button>
    </div>           
    )
}

function incNumber(){
  var c = parseInt(document.getElementsByTagName("input")[0].value);
  c++;
  document.getElementsByTagName("input")[0].value = c.toString();
}

function decNumber(){
  var c = parseInt(document.getElementsByTagName("input")[0].value);
  if(c != 1){
    c--;
    document.getElementsByTagName("input")[0].value = c.toString();
  }
}