import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import moment, { Moment } from "moment";
import {
  Contract,
  Hostel,
  Lessee,
  PaymentPeriod,
  Room,
} from "../provider/Database";
import { useAuth } from "../provider/AuthProvider";
import { supabase } from "../utils/supabase";
import { router } from "expo-router";
import { colors } from "../constants/colors";
import { TextField } from "./TextField";

interface ContractProps {
  contractId: number | any;
  start_date: Date | any;
  expired_date: Date | any;
  monthly_payment_day: number | undefined;
  completed: boolean | undefined;
  lessees: Lessee | undefined;
  hostels: Hostel | undefined;
  rooms: Room | undefined;
}

const DateRangeComponent: React.FC<ContractProps> = ({
  contractId,
  start_date,
  expired_date,
  monthly_payment_day,
  lessees,
  hostels,
  rooms,
}) => {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [note, setNote] = useState("");
  const [value, setValue] = useState(0);
  const [period, setPeriod] = useState(0);
  const [paymentPeriod, setPaymentPeriod] = useState<PaymentPeriod[]>([]);

  useEffect(() => {
    getPeriod(contractId);
  }, []);

  const handleSave = () => {
    completedPeriod(
      contractId,
      lessees?.id,
      hostels?.id,
      rooms?.id,
      value,
      note,
      period
    );
    setModalVisible(false);
  };
  // Chuyển đổi thời gian từ chuỗi sang đối tượng moment
  const startMoment = moment(start_date);
  const endMoment = moment(expired_date);
  const paymentMoment = moment(monthly_payment_day);

  // Tính số tháng giữa thời gian bắt đầu và kết thúc
  const monthsDiff = endMoment.diff(startMoment, "months");
  const paymentsDiff = endMoment.diff(paymentMoment, "months");

  // Tạo mảng chứa thông tin từng tháng
  const monthArray = Array.from({ length: monthsDiff + 1 }, (_, index) =>
    startMoment.clone().add(index, "months")
  );
  const monthPaymentArray = Array.from(
    { length: paymentsDiff + 2 },
    (_, index) => paymentMoment.clone().add(index, "months")
  );

  const lengthMonthArray = monthArray.length - 1;

  async function getPeriod(id: number) {
    try {
      setLoading(true);
      const { error, data } = await supabase
        .from("manage_payment")
        .select("*")
        .eq("contract_id", id);

      if (data) {
        setPaymentPeriod(data);
      }

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function completedPeriod(
    contractId: any,
    lesseeId: any,
    hostelId: any,
    roomId: any,
    value: any,
    note: string,
    period: any
  ) {
    try {
      const data = {
        contract_id: contractId,
        lessee_id: lesseeId,
        hostel_id: hostelId,
        room_id: roomId,
        value: value,
        note: note,
        period_of_contract: period,
      };
      setLoading(true);
      const { error: payment } = await supabase
        .from("manage_payment")
        .insert(data);

      if (paymentPeriod.length - 1 == lengthMonthArray) {
        const { error: ct } = await supabase
          .from("manage_rental_contract")
          .update({ completed: true })
          .eq("id", data.contract_id);

        if (ct) {
          throw console.log(payment);
        }
      }

      if (payment) {
        throw console.log(payment);
      } else {
        router.replace("/home/manage_contract");
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {monthArray.map((month, index) => (
        <View key={index}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              setModalVisible(true);
              setPeriod(index);
            }}
            key={index}
            disabled={
              paymentPeriod.map((p) => p.period_of_contract).includes(index)
                ? true
                : false
            }
          >
            <Text
              style={{
                marginTop: 5,
                fontSize: 16,
                marginBottom: 5,
                fontFamily: "open-sans-bold",
              }}
            >
              Kì #{index}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 13,
                  marginBottom: 5,
                  fontFamily: "open-sans",
                }}
              >
                {index == 0
                  ? `Bắt đầu: ${startMoment.format("DD/MM/YYYY")}`
                  : `Bắt đầu: ${month
                      .startOf("month")
                      .format("DD/MM/YYYY")}`}{" "}
                -
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  marginBottom: 5,
                  fontFamily: "open-sans",
                }}
              >
                {" "}
                {index == lengthMonthArray
                  ? `Kết thúc: ${endMoment.format("DD/MM/YYYY")}`
                  : `Kết thúc: ${month.endOf("month").format("DD/MM/YYYY")}`}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 13,
                marginBottom: 5,
                fontFamily: "open-sans",
              }}
            >
              Ngày thanh toán: {monthPaymentArray[index].format("DD/MM/YYYY")}
            </Text>
            <Text
              style={{
                fontSize: 13,
                marginBottom: 5,
                fontFamily: "open-sans",
              }}
            >
              Trạng thái:{" "}
              {paymentPeriod.map((p) => p.period_of_contract).includes(index)
                ? "Đã thanh toán"
                : "Chưa thanh toán"}
            </Text>
            {paymentPeriod.map((p) => p.period_of_contract).includes(index) ? <Text
              style={{
                fontSize: 13,
                marginBottom: 5,
                fontFamily: "open-sans",
              }}
            >
              Số tiền thanh toán: {paymentPeriod.filter((p) => p.period_of_contract == index).map((p) => p.value)}
            </Text> : ""}
          </TouchableOpacity>
        </View>
      ))}
      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text
              style={{
                fontFamily: "open-sans-bold",
                fontSize: 20,
                color: colors.primary,
              }}
            >
              Thanh toán
            </Text>
            <View style={styles.containerInput}>
              <TextField placeholder="Tổng giá tiền" onTextChange={setValue} />
            </View>
            <View style={styles.containerBtn}>
              <Text style={{ fontSize: 20, marginStart: 20 }}>Lưu ý: </Text>
              <TextInput
                autoCapitalize="none"
                style={styles.textField}
                onChangeText={(text) => setNote(text)}
                multiline={true}
              />
            </View>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.saveButton}>Đồng ý đã thanh toán</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DateRangeComponent;

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: "#DBDBDB",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 20,
    paddingRight: 10,
    width: 320,
    fontFamily: "open-sans",
  },
  containerInput: {
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: "#DBDBDB",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 20,
    paddingRight: 10,
    width: 320,
    fontFamily: "open-sans",
  },
  containerBtn: {
    marginTop: 10,
    marginBottom: 8,
    flexDirection: "row",
    width: 320,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    backgroundColor: "#DBDBDB",
    margin: 10,
    fontFamily: "open-sans",
  },
  textField: {
    flex: 1,
    height: 50,
    fontSize: 20,
    color: "#000",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButton: {
    marginTop: 14,
    color: colors.primary,
    fontFamily: "open-sans-bold",
  },
  closeButton: {
    color: "red",
    marginTop: 10,
    fontFamily: "open-sans",
  },
});
