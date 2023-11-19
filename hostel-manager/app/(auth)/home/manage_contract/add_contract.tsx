import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useAuth } from "../../../../provider/AuthProvider";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../utils/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../../../constants/colors";
import { Button } from "react-native-elements";
import { Hostel, Lessee, Room } from "../../../../provider/Database";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const add_contract = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [lesseeId, setLesseeId] = useState();
  const [hostelId, setHostelId] = useState();
  const [room, setRoom] = useState<Room>();
  const [monthlyPaymentDay, setMonthlyPaymentDay] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [expiredDate, setExpiredDate] = useState(new Date());
  const [file_url, setFileUrl] = useState<string>("");
  const { user, session } = useAuth();
  const [listLessee, setListLessee] = useState<Lessee[]>([]);
  const [listHostel, setListHostel] = useState<Hostel[]>([]);
  const [listRoom, setListRoom] = useState<Room[]>([]);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isExpirediDatePickerVisible, setExpiredStartDatePickerVisibility] =
    useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      if (!user) throw new Error("No user on the session!");

      const { data: lessees } = await supabase
        .from("manage_lessee")
        .select("*")
        .eq("created_by", user.id);

      const { data: hostels } = await supabase
        .from("hostels")
        .select("*")
        .eq("owner_id", user.id);

      const { data: rooms } = await supabase
        .from("rooms")
        .select("*, hostels(id, owner_id)")
        .eq("hostels.owner_id", user.id);

      if (lessees && hostels && rooms) {
        setListLessee(lessees);
        setListRoom(rooms);
        setListHostel(hostels);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  async function create_contract({
    lessee_id,
    hostel_id,
    room_id,
    monthly_payment_day,
    monthly_price,
    start_date,
    expired_date,
    file_url,
  }: {
    lessee_id: any;
    hostel_id: any;
    room_id: any;
    monthly_payment_day: any;
    monthly_price: any;
    start_date: any;
    expired_date: any;
    file_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      if (
        lessee_id === null &&
        monthly_payment_day === null &&
        hostel_id === null &&
        room_id === null &&
        monthly_price === null &&
        start_date === null &&
        expired_date === null
      ) {
        Alert.alert("Please enter information!");
      } else {

        const data = {
          lessee_id: lessee_id,
          monthly_payment_day: monthly_payment_day,
          hostel_id: hostel_id,
          room_id: room_id,
          start_date: start_date,
          expired_date: expired_date,
          monthly_price: monthly_price,
          file_url: file_url,
        };

        const { error } = await supabase
          .from("manage_rental_contract")
          .upsert(data);

        if (error) {
          throw console.log(error);
        } else {
          router.replace("/home/manage_rental_contracts");
        }
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
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: colors.primary,
              fontSize: 42,
              fontWeight: "500",
              marginBottom: 10,
              marginTop: 10,
              fontFamily: "open-sans",
            }}
          >
            Hợp đồng
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
              color: "grey",
              marginTop: 5,
              marginBottom: 10,
              fontFamily: "open-sans",
            }}
          >
            Nhập vào thông tin cần thiết để tạo hợp đồng
          </Text>

          <View style={styles.containerBtn}>
            <Text
              style={{
                paddingStart: 10,
                width: 140,
                fontFamily: "open-sans-bold",
                fontSize: 14,
              }}
            >
              Chọn nhà trọ:{" "}
            </Text>
            <Text
              style={{
                fontFamily: "open-sans-bold",
                fontSize: 14,
              }}
            >
              :
            </Text>
            <Picker
              selectedValue={hostelId}
              onValueChange={(itemValue) => setHostelId(itemValue)}
              mode="dialog"
              style={{ width: 180, height: "100%" }}
            >
              {listHostel.map((item) => (
                <Picker.Item
                  key={item.id}
                  fontFamily="open-sans"
                  label={item.name}
                  value={item.id}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.containerBtn}>
            <Text
              style={{
                paddingStart: 10,
                width: 140,
                fontFamily: "open-sans-bold",
                fontSize: 14,
              }}
            >
              Chọn phòng trọ{" "}
            </Text>
            <Text
              style={{
                fontFamily: "open-sans-bold",
                fontSize: 14,
              }}
            >
              :
            </Text>
            <Picker
              selectedValue={room}
              onValueChange={(itemValue) => setRoom(itemValue)}
              mode="dialog"
              style={{ width: 180, height: "100%" }}
            >
              {listRoom
                .filter((item) => {
                  return item.hostel_id == hostelId;
                })
                .map((item) => (
                  <Picker.Item
                    key={item.id}
                    fontFamily="open-sans"
                    label={item.name}
                    value={item}
                  />
                ))}
            </Picker>
          </View>

          <View style={styles.containerBtn}>
            <Text
              style={{
                paddingStart: 10,
                width: 140,
                fontFamily: "open-sans-bold",
                fontSize: 14,
              }}
            >
              Chọn người thuê{" "}
            </Text>
            <Text
              style={{
                fontFamily: "open-sans-bold",
                fontSize: 14,
              }}
            >
              :
            </Text>
            <Picker
              selectedValue={lesseeId}
              onValueChange={(itemValue) => setLesseeId(itemValue)}
              mode="dialog"
              style={{ width: 180, height: "100%" }}
            >
              {listLessee.map((item) => (
                <Picker.Item
                  key={item.id}
                  fontFamily="open-sans"
                  style={{ backgroundColor: "#DBDBDB", marginStart: 30 }}
                  label={item.name}
                  value={item.id}
                />
              ))}
            </Picker>
          </View>
          <TouchableOpacity
            style={styles.containerBtn}
            onPress={() => {
              setStartDatePickerVisibility(true);
            }}
          >
            <Text
              style={{
                paddingStart: 10,
                width: 145,
                fontFamily: "open-sans-bold",
                fontSize: 14,
              }}
            >
              Chọn ngày bắt đầu
            </Text>
            <Text
              style={{
                fontFamily: "open-sans-bold",
                fontSize: 14,
              }}
            >
              :
            </Text>
            <Text style={{ width: 180, paddingStart: 20 }}>
              {startDate.toLocaleDateString("VI")}
            </Text>
            <DateTimePickerModal
              isVisible={isStartDatePickerVisible}
              mode="date"
              onConfirm={(date) => {
                setStartDate(date);
                setStartDatePickerVisibility(!isStartDatePickerVisible);
              }}
              minimumDate={new Date()}
              onCancel={() =>
                setStartDatePickerVisibility(!isStartDatePickerVisible)
              }
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.containerBtn}
            onPress={() => {
              setExpiredStartDatePickerVisibility(true);
            }}
          >
            <Text
              style={{
                paddingStart: 10,
                width: 145,
                fontFamily: "open-sans-bold",
                fontSize: 14,
              }}
            >
              Chọn ngày kết thúc
            </Text>
            <Text
              style={{
                fontFamily: "open-sans-bold",
                fontSize: 14,
              }}
            >
              :
            </Text>
            <Text style={{ width: 180, paddingStart: 20 }}>
              {expiredDate.toLocaleDateString("VI")}
            </Text>
            <DateTimePickerModal
              isVisible={isExpirediDatePickerVisible}
              mode="date"
              onConfirm={(date) => {
                setExpiredDate(date);
                setExpiredStartDatePickerVisibility(
                  !isExpirediDatePickerVisible
                );
              }}
              minimumDate={startDate}
              onCancel={() =>
                setExpiredStartDatePickerVisibility(
                  !isExpirediDatePickerVisible
                )
              }
            />
          </TouchableOpacity>
          <View style={styles.containerBtn}>
            <Text
              style={{
                paddingStart: 10,
                width: 145,
                fontFamily: "open-sans-bold",
                fontSize: 14,
              }}
            >
              Nhập ngày thanh toán
            </Text>
            <Text
              style={{
                fontFamily: "open-sans-bold",
                fontSize: 14,
              }}
            >
              :
            </Text>
            <TextInput
              autoCapitalize="none"
              style={styles.textField}
              keyboardType="numeric"
              onChangeText={(text) => setMonthlyPaymentDay(Number(text))}
            />
          </View>
          <View style={styles.containerBtn}>
            <Text
              style={{
                paddingStart: 10,
                width: 145,
                fontFamily: "open-sans-bold",
                fontSize: 14,
              }}
            >
              Số tiền thanh toán
            </Text>
            <Text
              style={{
                fontFamily: "open-sans-bold",
                fontSize: 14,
              }}
            >
              :
            </Text>
            <TextInput
              autoCapitalize="none"
              style={styles.textField}
              value={room?.monthly_price.toString()}
              editable={false}
            />
          </View>
          <Button
            title={loading ? "Đang cập nhật" : "Thêm hợp đồng"}
            buttonStyle={{
              backgroundColor: colors.primary,
              width: 320,
              height: 50,
              borderRadius: 30,
              marginTop: 20,
            }}
            titleStyle={{ fontFamily: "open-sans" }}
            onPress={() => {
              create_contract({
                hostel_id: hostelId,
                lessee_id: lesseeId,
                room_id: room?.id,
                start_date: startDate,
                expired_date: expiredDate,
                monthly_payment_day: monthlyPaymentDay,
                monthly_price: room?.monthly_price.valueOf(),
                file_url: file_url,
              });
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default add_contract;

const styles = StyleSheet.create({
  containerBtn: {
    marginTop: 10,
    marginBottom: 8,
    flexDirection: "row",
    width: 320,
    height: 48,
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
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 20,
    paddingRight: 10,
    fontFamily: "open-sans",
  },
  textField: {
    height: 48,
    width: 180,
    fontSize: 14,
    color: "#000",
    paddingStart: 20,
  },
});
