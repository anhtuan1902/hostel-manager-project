import {
  StyleSheet,
  Alert,
  View,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SearchBar } from "../../../../components/SearchBar";
import { FlatList } from "react-native-gesture-handler";
import { colors } from "../../../../constants/colors";
import { StatusBar } from "expo-status-bar";
import Icon from "../../../../components/Icon";
import { useRouter } from "expo-router";
import { supabase } from "../../../../utils/supabase";
import { useAuth } from "../../../../provider/AuthProvider";
import { Contract } from "../../../../provider/Database";

const manage_rental_contracts = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [listContract, setListContract] = useState<Contract[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    getRentalContract();
  }, []);

  async function getRentalContract() {
    try {
      if (!user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("manage_rental_contract")
        .select(
          "*, manage_lessee(id, name), hostels(id, name, owner_id), rooms(id, name)"
        )
        .eq("hostels.owner_id", user.id);

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setListContract(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const renderItem = (item: any) => {
    return (
      <ScrollView>
        <TouchableOpacity
          style={styles.containerBtn}
          onPress={() => {
            router.push({
              pathname: "/home/manage_contract/detail_contract",
              params: { id: item.item.id },
            });
          }}
        >
          <View>
            <Text
              style={{
                paddingStart: 30,
                fontSize: 16,
                marginBottom: 10,
                fontFamily: "open-sans-bold",
              }}
            >
              #{item.item.id}
            </Text>
            <View
              style={{
                paddingStart: 30,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icon name={"Hotel"} color={"black"} size={20} />
              <Text
                style={{
                  paddingStart: 10,
                  fontSize: 14,
                  fontFamily: "open-sans",
                }}
              >
                {item.item.rooms.name} - {item.item.hostels.name}
              </Text>
            </View>
            <View
              style={{
                paddingStart: 30,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icon name={"CalendarDays"} color={"black"} size={20} />
              <Text
                style={{
                  paddingStart: 10,
                  fontSize: 14,
                  fontFamily: "open-sans",
                }}
              >
                Từ {item.item.start_date.toString().substring(0, 10)} đến{" "}
                {item.item.expired_date.toString().substring(0, 10)}
              </Text>
            </View>
            <View
              style={{
                paddingStart: 30,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icon name={"User"} color={"black"} size={20} />
              <Text
                style={{
                  paddingStart: 10,
                  fontSize: 14,
                  fontFamily: "open-sans",
                }}
              >
                Nguời thuê: {item.item.manage_lessee.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} style="light" />
      <View style={styles.body}>
        <SearchBar placeholder="Tìm kiếm mã hợp đồng" onTextChange={setSearch} />

        {loading ? (
          <ActivityIndicator color={colors.primary} animating={loading} />
        ) : (
          <FlatList
            data={listContract.filter( contract => contract.id.toString().includes(search))}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
          />
        )}
      </View>
      <View style={styles.foorer}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            width: 50,
            borderRadius: 50,
          }}
          onPress={() => {
            router.push("/home/manage_contract/add_contract");
          }}
        >
          <Icon name="Plus" color={colors.white} size={50} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default manage_rental_contracts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigation: {
    flex: 2,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 8,
    marginTop: 20,
    alignItems: "center",
    marginHorizontal: 20,
  },
  foorer: {
    flex: 1,
    alignSelf: "flex-end",
    marginEnd: 20,
  },
  containerCard: {
    backgroundColor: "#fff",
    width: 320,
    height: 180,
    justifyContent: "center",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  cardNumber: {
    fontSize: 14,
    color: "#023047",
    alignSelf: "center",
    marginTop: 10,
  },
  containerBtn: {
    marginTop: 10,
    marginBottom: 8,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: 320,
    height: 150,
    alignItems: "center",
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
});
