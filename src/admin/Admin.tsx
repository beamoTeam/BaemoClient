import { useState, useCallback, useEffect } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import Main from "./Main";
import Spinner from "../components/spinner/Spinner";
import adminClient from "./api/adminService";
import { useLocation } from "react-router";
import ReceiptModal from "./modal/ReceiptModal";

export default function Admin() {
  const location = useLocation();
  const [open, setOpen] = useState<boolean>(true);
  const [orders, setOrders] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState<any>("접수 대기");
  const [openReceipt, setOpenReceipt] = useState<boolean>(false);
  const [receiptSeq, setReceiptSeq] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const r_seq = location.pathname.split("/").at(-1);
      try {
        const res = await adminClient.fetchOrderData(r_seq);
        setOrders(res);
      } catch (err) {
        setOrders("err");
      }
    })();
  }, [location.pathname]);

  const toggleSidebar = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const acceptOrder = async (room_seq: any) => {
    try {
      const res = await adminClient.changeOrderStatus(room_seq);
      if (res === "") {
        setOrders(
          orders.map((order: any) => {
            if (order.c_seq === room_seq) {
              return { ...order, accept: true };
            }
            return order;
          })
        );
      }
      if (res.status >= 400) {
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (err: any) {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const toggleReceipt = () => {
    setOpenReceipt((prev) => !prev);
  };

  const openReceiptModal = (chat_seq: any) => {
    setOpenReceipt(true);
    setReceiptSeq(chat_seq);
  };

  const printReceipt = () => {
    window.print();
  };

  if (!orders) {
    return <Spinner />;
  }
  if (orders === "error") {
    return <h4>오류가 발생했습니다. 다시 시도해주세요</h4>;
  }

  let currentOrderList = null;
  if (currentTab === "접수 대기") {
    currentOrderList = orders.filter(
      (order: any) => !(order.accepted === "접수 완료")
    );
  } else if (currentTab === "접수 완료") {
    currentOrderList = orders.filter(
      (order: any) => order.accepted === "접수 완료"
    );
  }

  const receiptItems = receiptSeq
    ? currentOrderList.find((order: any) => order.c_seq === receiptSeq)
    : null;

  return (
    <>
      <Header />
      <section style={{ display: "flex", color: "black" }} className="no-print">
        <SideBar
          open={open}
          orders={orders}
          toggleSidebar={toggleSidebar}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        <Main
          orders={currentOrderList}
          acceptOrder={acceptOrder}
          openReceiptModal={openReceiptModal}
        />
      </section>
      {openReceipt && (
        <ReceiptModal
          toggleReceipt={toggleReceipt}
          printReceipt={printReceipt}
          receiptItems={receiptItems}
        />
      )}
    </>
  );
}