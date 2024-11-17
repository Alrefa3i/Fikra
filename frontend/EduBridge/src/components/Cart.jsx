import React, { useEffect } from 'react'
import { useCart } from 'react-use-cart'

const Cart = () => {
    const { isEmpty, items, getItem, updateItemQuantity, removeItem } = useCart();


    useEffect(() => {
        if (isEmpty) {
            document.getElementById("my-drawer-4").checked = false
        }
    }, [isEmpty, items])



    return (
        <div>
            <div className="drawer drawer-end ">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer-4" className="drawer-overlay">

                        <div className="indicator">
                            <span className="indicator-item badge badge-ghost w-4 text-base">
                                {items.length}
                            </span>
                            <i className="fa-solid fa-cart-shopping text-2xl"></i>
                        </div></label>

                </div>
                <div className="drawer-side z-50">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    {!isEmpty && <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {items.map((item) => (
                            <li key={item.id} className="flex justify-between items-center py-2 border-b">
                                <div className="flex items-center">
                                    <img src={item.image != "" ? item.image : "https://via.placeholder.com/50"} alt="Product" className="w-12 h-12 object-cover" />
                                    <div className="ml-4 ">
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-sm">{item.category}</p>
                                        <p className="font-semibold mt-3">{item.price} - {item.itemTotal}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className=" h-10 w-32">
                                        <div className="flex flex-row h-10  rounded-lg relative mt-1">
                                            <button className=" h-full w-14 rounded-l cursor-pointer">
                                                <span className="m-auto text-xl font-thin" onClick={() => updateItemQuantity(item.id, (item.quantity ?? 0) - 1)}>−</span>
                                            </button>
                                            <input type="number" className=" w-1/2 text-center" name="custom-input-number" value={getItem(item.id).quantity}></input>
                                            <button className="h-full w-14 rounded-r cursor-pointer">
                                                <span className="m-auto text-xl font-thin" onClick={() => updateItemQuantity(item.id, (item.quantity ?? 0) + 1)}>+</span>
                                            </button>
                                        </div>
                                    </div>

                                    <button className="ml-4 text-red-500 hover:text-red-700" onClick={() => removeItem(item.id)}>
                                        <i className="fa-solid fa-trash" ></i>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>}
                </div>
            </div>
        </div>
    )
}

export default Cart