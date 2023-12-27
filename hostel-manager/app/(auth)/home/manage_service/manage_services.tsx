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
import { Service } from "../../../../provider/Database";

const manage_services = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [listService, setListService] = useState<Service[]>([]);
  const { user } = useAuth();

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  useEffect(() => {
    getServices();
  }, []);

  async function getServices() {
    try {
      if (!user) throw new Error("No user on the session!");

      
      let { data: services, error, status } = await supabase
        .from('services')
        .select('*')
        .eq("owner_id", user.id);

      if (error && status !== 406) {
        throw error;
      }
      if (services) {
        setListService(services);
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
              pathname: "/home/manage_service/detail_service",
              params: { id: item.item.id },
            });
          }}
        >
          <View>
            <View
              style={{
                alignItems: 'center',
                width: 150,
              }}
            >
              <Icon name={item.item.icon} color={"black"} size={50} />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "open-sans",
                  marginTop: 10
                }}
              >
                {item.item.name}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "open-sans",
                }}
              >
                {VND.format(item.item.price)}
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
        <SearchBar placeholder="Tìm kiếm dịch vụ" onTextChange={setSearch} />

        {loading ? (
          <ActivityIndicator color={colors.primary} animating={loading} />
        ) : (
          <FlatList
            data={listService.filter( service => service.id.toString().includes(search))}
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
            router.push("/home/manage_service/add_service");
          }}
        >
          <Icon name="Plus" color={colors.white} size={50} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default manage_services;

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
    marginHorizontal: 30,
    alignItems: "center",
  },
  foorer: {
    flex: 1,
    alignSelf: "flex-end",
    marginEnd: 20,
  },
  containerBtn: {
    margin: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: 150,
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
