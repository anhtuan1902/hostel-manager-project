import {
  StyleSheet,
  Alert,
  View,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SearchBar } from "../../../components/SearchBar";
import { FlatList } from "react-native-gesture-handler";
import { colors } from "../../../constants/colors";
import { StatusBar } from "expo-status-bar";
import Icon from "../../../components/Icon";
import { useRouter } from "expo-router";
import { supabase } from "../../../utils/supabase";
import { useAuth } from "../../../provider/AuthProvider";
import { Hostel } from "../../../provider/Database";

const hostel_manager = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [listHostel, setListHostel] = useState<Hostel[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    getHostels();
  }, []);

  async function getHostels() {
    try {
      if (!user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("hostels")
        .select("*")
        .eq("owner_id", user.id);
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setListHostel(data);
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
      <TouchableOpacity
        style={styles.containerBtn}
        onPress={() => {
          router.push({
            pathname: "/hostel_manager/detail_hostel",
            params: { id: item.item.id },
          });
        }}
      >
        <View style={{ width: 150, height: 100 }}>
          {false ? (
            <Image
              source={{ uri: item.item.image_url }}
              style={{
                width: "100%",
                height: "100%",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
          ) : (
            <View
              style={{
                height: "100%",
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              <Icon name={"Building2"} size={55} color={"black"} />
            </View>
          )}
        </View>
        <Text style={{ fontSize: 14, margin: 5, fontFamily:'open-sans-bold' }}>
          {item.item.name.length > 12
            ? `${item.item.name.substring(0, 12)}...`
            : item.item.name}
        </Text>
        <Text style={{ fontSize: 10, marginBottom: 5, fontFamily:'open-sans' }}>
          {item.item.address.length > 18
            ? `${item.item.address.substring(0, 18)}...`
            : item.item.address}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} style="light" />
      <View style={styles.body}>
        <SearchBar placeholder="Tìm kiếm nhà trọ" onTextChange={setSearch} />
        {loading ? (
          <ActivityIndicator color={colors.primary} animating={loading} />
        ) : (
          <FlatList
            data={listHostel}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
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
            router.push("/hostel_manager/add_hostels");
          }}
        >
          <Icon name="Plus" color={colors.white} size={50} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default hostel_manager;

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
    width: 350,
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
    margin: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    width: 150,
    height: 150,
  },
});
