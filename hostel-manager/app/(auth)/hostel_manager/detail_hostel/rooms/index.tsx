import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../../../../constants/colors";
import { StatusBar } from "expo-status-bar";
import Icon from "../../../../../components/Icon";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "../../../../../provider/AuthProvider";
import { Room } from "../../../../../provider/Database";
import { supabase } from "../../../../../utils/supabase";
import { SearchBar } from "../../../../../components/SearchBar";

const rooms = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [listRoom, setListRoom] = useState<Room[]>([]);
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const params = useLocalSearchParams();
  const { id } = params;
  const [dataParam, setDataParam] = useState(id);
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  useEffect(() => {
    if (id) {
      setDataParam(id);
    }
    getRooms(dataParam);
  }, []);

  async function getRooms(id: any) {
    try {
      if (!user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("rooms")
        .select("*")
        .eq("hostel_id", id);
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setListRoom(data);
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
            pathname: "/hostel_manager/detail_hostel/rooms/detail_room",
            params: { id: item.item.id },
          });
        }}
      >
        <View style={{ width: 150, height: 100 }}>
          {item.item.image_url ? (
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
            <Icon name="Home" size={55} color="black" />
            </View>
          )}
        </View>
        <Text style={{ fontSize: 14, margin: 5, fontFamily:'open-sans-bold'}}>{item.item.name}</Text>
        <Text style={{ fontSize: 10, marginBottom: 5, fontFamily:'open-sans' }}>
          {VND.format(item.item.monthly_price)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} style="light" />
      <View style={styles.body}>
      <SearchBar placeholder="Tìm kiếm phòng trọ" onTextChange={setSearch} />
        {loading ? (
          <ActivityIndicator color={colors.primary} animating={loading} />
        ) : (
          <FlatList
            data={listRoom.filter(room => room.name.toLowerCase().includes(search.toLowerCase()))}
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
            router.push({ pathname:"/hostel_manager/detail_hostel/rooms/add_room", params: { id: dataParam}});
          }}
        >
          <Icon name="Plus" color={colors.white} size={50} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default rooms;

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
