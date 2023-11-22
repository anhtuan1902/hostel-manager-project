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
import { Lessee } from "../../../../provider/Database";

const manage_lessee = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [listLessee, setListLessee] = useState<Lessee[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    getLessee();
  }, []);

  async function getLessee() {
    try {
      if (!user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("manage_lessee")
        .select("*")
        .eq("created_by", user.id);
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setListLessee(data);
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
              pathname: "/home/manage_lessee/detail_lessee",
              params: { id: item.item.id },
            });
          }}
        >
          <View style={{ height: 150, width: 130 }}>
            {item.item.image_url ? (
              <Image
                source={{ uri: item.item.image_url }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
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
                <Icon name={"User"} size={55} color={"black"} />
              </View>
            )}
          </View>
          <View
            style={{
              alignItems: "flex-start",
              justifyContent: "center",
              width: 190,
            }}
          >
            <Text
              style={{
                paddingStart: 30,
                fontSize: 14,
                marginBottom: 10,
                fontFamily: "open-sans-bold",
              }}
            >
              {item.item.name}
            </Text>
            <Text
              style={{
                paddingStart: 30,
                fontSize: 10,
                marginBottom: 10,
                fontFamily: "open-sans",
              }}
            >
              {item.item.citizen_id}
            </Text>
            <Text
              style={{
                paddingStart: 30,
                fontSize: 10,
                marginBottom: 10,
                fontFamily: "open-sans",
              }}
            >
              {item.item.phone_number}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} style="light" />
      <View style={styles.body}>
        <SearchBar placeholder="Tìm kiếm người thuê" onTextChange={setSearch} />

        {loading ? (
          <ActivityIndicator color={colors.primary} animating={loading} />
        ) : (
          <FlatList
            data={listLessee.filter( lessee => lessee.name.toLowerCase().includes(search.toLowerCase()) || lessee.citizen_id.includes(search))}
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
            router.push("/home/manage_lessee/add_lessee");
          }}
        >
          <Icon name="Plus" color={colors.white} size={50} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default manage_lessee;

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
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
});
