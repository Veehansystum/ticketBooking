import React, { useState } from 'react'

function TicketBooking() {
    const [selectedSeat, setSelectedSeat]=useState([]);
    const [booked, setBooked]=useState([]);

    const categorySeat = {
        Regular: { row: ["A", "B"], price: 150, color: "silver" },
        Premium: { row: ["C", "D", "E"], price: 200, color: "lightSkyblue" },
        VIP: { row: ["F", "G", "H"], price: 300, color: "gold" }
    }
    const cinemaSeats = Array.from({ length: 12 });

    const seletcSeat = (seatId) => {
        if(selectedSeat.includes(seatId)){
            let filterData=selectedSeat.filter((curVal,i)=>{
                return curVal !== seatId
            });
            setSelectedSeat(filterData);
            return;
        }
        setSelectedSeat((prev) => [...prev,seatId])
    }
    console.log(selectedSeat)
    const totalPrice= selectedSeat.reduce((sum,curVal)=>{
        const category =curVal[0];
        const isExist = Object.values(categorySeat).filter((curVal)=>{
            return curVal.row.includes(category)
        })
        return sum + (isExist ? isExist[0].price :0);
    },0)

    const bookeseat=()=>{
        if(selectedSeat.length === 0){
            alert("First seletc seat");
            return;
        };
        setBooked((prev)=>[...prev,...selectedSeat])
        setSelectedSeat([]);
    }

    return (
        <div>
            <div className='container'>
                <div className="screen"></div>
                <div style={{ textAlign: "center" }}>Screen</div>
                <div className="">
                    {
                        Object.entries(categorySeat).map(([category, { row, price, color }]) => {
                            return row.map((row, index) => {
                                return (
                                    <div className="seats">
                                        <span >{row}</span>
                                        <div className="btn-prarent">
                                            {
                                                cinemaSeats.map((_, index) => {
                                                    const seatId = row + (index + 1)
                                                    const seat = index + 1;
                                                    const isSelected =selectedSeat.includes(seatId);
                                                    const isBooked= booked.includes(seatId);
                                                    return (
                                                        <button disabled={isBooked} style={{ backgroundColor:isBooked ? "red" :isSelected ? " rgb(54, 236, 54)": color }}
                                                            onClick={() => seletcSeat(seatId)} >{seat}</button>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        })
                    }
                </div>
                {/* {category with price} */}
                <div className="price-inecator">
                    {Object.entries(categorySeat).map((curValue, i) => {
                        const category = curValue[0]
                        return (
                            <div style={{ display: "flex", alignItems: "center", gap: "0.2em" }}>
                                <div className='price-color' style={{ backgroundColor: curValue[1].color }}>
                                </div>
                                <div  >{`${category} (${curValue[1].price})`}</div>
                            </div>
                        )
                    })
                    }
                    <div style={{ display: "flex", alignItems: "center", gap: "0.2em" }}>
                        <div className='price-color' style={{ backgroundColor: 'red' }}>
                        </div>
                        <div  >Booked</div>
                    </div>
                </div>
                {/* seat information */}
                <div className="seat-details">
                   {selectedSeat.length > 0 ?
                   <div className=''>
                    <div> Selected Seats : {selectedSeat.join(", ")} </div>
                    <div className="">No. of Seats : {selectedSeat.length} </div>
                    <div className="">Total Price : {totalPrice} Rs. </div>
                   </div> 
                   :"No seat selected"}
                </div>
                <div className="book-btn">
                    <button className='book-seat' onClick={bookeseat}>Book Seat</button>
                </div>
            </div>
        </div>

    )
}

export default TicketBooking