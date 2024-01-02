import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { colors } from "../constants/colors";
import { PaymentPeriod } from "../provider/Database";
import { supabase } from "../utils/supabase";
import { useAuth } from "../provider/AuthProvider";
import { itemType } from "react-native-gifted-charts/src/BarChart/types";


const GroupedBars: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [listPayment, setListPayment] = useState<PaymentPeriod[]>([]);
  const today = new Date();
  const barData = [
    {
      value: 0,
      label: "Jan",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#177AD5",
    },
    { value: 20, frontColor: "#ED6665" },
    {
      value: 50,
      label: "Feb",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#177AD5",
    },
    { value: 40, frontColor: "#ED6665" },
    {
      value: 75,
      label: "Mar",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#177AD5",
    },
    { value: 25, frontColor: "#ED6665" },
    {
      value: 30,
      label: "Apr",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#177AD5",
    },
    { value: 20, frontColor: "#ED6665" },
    {
      value: 60,
      label: "May",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#177AD5",
    },
    { value: 40, frontColor: "#ED6665" },
    {
      value: 65,
      label: "Jun",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#177AD5",
    },
    { value: 40, frontColor: "#ED6665" },
    {
      value: 65,
      label: "Jul",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#177AD5",
    },
    { value: 40, frontColor: "#ED6665" },
    {
      value: 65,
      label: "Aug",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#177AD5",
    },
    { value: 40, frontColor: "#ED6665" },
    {
      value: 65,
      label: "Sep",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#177AD5",
    },
    { value: 40, frontColor: "#ED6665" },
    {
      value: 65,
      label: "Oct",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#177AD5",
    },
    { value: 40, frontColor: "#ED6665" },
    {
      value: 65,
      label: "Nov",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#177AD5",
    },
    { value: 40, frontColor: "#ED6665" },
    {
      value: 65,
      label: "Dec",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#177AD5",
    },
    { value: 30, frontColor: "#ED6665" },
  ];

  barData.map((item, index) => {
    if (index % 2 == 0) {
      item.value = 0;
    } else if (index % 2 != 0) {
      item.value = 0;
    }
  });

  listPayment.map(
    (item) =>
      (barData[
        (parseInt(item.created_at.toString().substring(5, 7), 10) - 1) * 2
      ].value += item.value)
  );

  useEffect(() => {
    getPayment();
  }, []);

  async function getPayment() {
    try {
      setLoading(true);
      if (!user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("manage_payment")
        .select("*, hostels(id, name, owner_id)")
        .eq("hostels.owner_id", user.id);

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setListPayment(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const renderTitle = () => {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Biểu đồ thu nhập trong năm {today.getFullYear()}</Text>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#177AD5" }]}
            />

            <Text style={[styles.legendText, { color: "#177AD5" }]}>
              Khoản thu
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#ED6665" }]}
            />
            <Text style={[styles.legendText, { color: "#ED6665" }]}>
              Khoản chi
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      {renderTitle()}
      <BarChart
        data={today.getMonth() > 5 ? barData.slice(8, 24) : barData.slice(0, 16)}
        barWidth={8}
        spacing={24}
        roundedBottom
        roundedTop
        hideRules
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={styles.yAxisTextStyle}
        noOfSections={8}
        maxValue={100000}
      />
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: colors.white,
    paddingBottom: 40,
  },
  titleContainer: {
    marginVertical: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  titleText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  legendContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 24,
    backgroundColor: "yellow",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendColor: {
    height: 12,
    width: 12,
    marginRight: 8,
  },
  legendText: {
    width: 70,
    height: 16,
  },
  yAxisTextStyle: {
    color: "gray",
  },
};

export default GroupedBars;
