import React from "react";
import Swal from "sweetalert2";
import reservation from "../models/Reservation";
import repositories from "../repositories";
import conf from '../config/conf';
import { BEARER } from "../constant";
import { getToken } from "../helpers";

interface Props {
    userRevserv: reservation
}

function DataTable(props: Props) {

    const listOfreserve = {
        tourname: props.userRevserv.attributes.tour.data.attributes.tour_name,
        currentPart: props.userRevserv.attributes.tour.data.attributes.current_participate,
        maxPart: props.userRevserv.attributes.tour.data.attributes.maximun_participate,
        reserveDate: new Date(props.userRevserv.attributes.createdAt).toISOString().slice(0, 10),        total_price: props.userRevserv.attributes.total_price,
        status: props.userRevserv.attributes.payment_status
    }

    const handlePayment = () => {
        Swal.fire({
            title: 'ยกเลิกการจอง?',
            text: `คุณต้องการยกเลิกการจองทัวร์ ${listOfreserve.tourname} ใช่หรือไม่`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#8fce00',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่',
            cancelButtonText: 'ไม่'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await updateParticipate(props.userRevserv)
                await repositories.ReserveRepo.delete(props.userRevserv.id)
                await Swal.fire('ยกเลิกการจองเสร็จสิ้น')
                window.location.reload()
            }
        })
    };

    const handleNotPayment = () => {
        Swal.fire({
            title: 'โปรดส่งสลิปการจ่ายเงินใน Line',
            text: `ยอดรวมทั้งสิ้น ${listOfreserve.total_price} บาท`,
            imageUrl: 'https://inwfile.com/s-cx/xofr1e.jpg',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonColor: '#8fce00',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิกการจอง'
        }).then(async (result) => {
            if (!result.isConfirmed) {
                await updateParticipate(props.userRevserv)
                await repositories.ReserveRepo.delete(props.userRevserv.id)
                await Swal.fire('ยกเลิกการจองเสร็จสิ้น')
                window.location.reload()
            };
        })
    }

    const updateParticipate = (reservation: reservation) => {
        const token = getToken();
        if (token) {
            const UserData = token.split('.');
            const User = JSON.parse(atob(UserData[1]));
            const new_current_participate = reservation.attributes.tour.data.attributes.current_participate - 1
            if (User.id) {
                if (reservation) {
                    fetch(`${conf.apiPrefix}/api/tours/${reservation.attributes.tour.data.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `${BEARER} ${token}`
                        },
                        body: JSON.stringify({
                            data: {
                                current_participate: new_current_participate
                            }
                        })
                    })
                }
            }
        }
    }

    return (
        <tbody>
            <tr>
                <td>{listOfreserve.tourname}</td>
                <td>{listOfreserve.currentPart}/{listOfreserve.maxPart}</td>
                <td>{listOfreserve.reserveDate}</td>
                <td>{listOfreserve.total_price} บาท</td>
                <td>{listOfreserve.status
                    ? <button onClick={handlePayment}>ชำระเงินเสร็จสิ้น</button>
                    : <button onClick={handleNotPayment}>ยังไม่ชำระเงิน</button>}
                </td>
            </tr>
        </tbody>
    )
}

export default DataTable;
