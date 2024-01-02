import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import GroupedBars from "../../../../components/IncomeBar";
import { colors } from "../../../../constants/colors";
import { supabase } from "../../../../utils/supabase";
import { useAuth } from "../../../../provider/AuthProvider";
import { useRouter } from "expo-router";
import { PaymentPeriod } from "../../../../provider/Database";

const manage_reports = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [listPayment, setListPayment] = useState<PaymentPeriod[]>([]);
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  useEffect(() => {
    getPayment();
  }, []);

  async function getPayment() {
    try {
      setLoading(true);
      if (!user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("manage_payment")
        .select(
          "*, manage_lessee(id, name), hostels(id, name, owner_id), rooms(id, name)"
        )
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

  return (
    <View style={styles.container}>
      <GroupedBars data={listPayment} />
      
      <View style={styles.containerHistory}>
        <Text style={styles.textHistory}>Lịch sử giao dịch</Text>
        {listPayment.map((transaction) => (
          <View key={transaction.id} style={styles.transaction}>
            <View>
            <Text style={styles.transactionDate}>{transaction.created_at.toString().substring(0, 10)}</Text>
            <Text style={styles.transactionText}>{transaction.manage_lessee?.name} - {transaction.rooms?.name} - {transaction.hostels?.name} - Kì {transaction.period_of_contract}</Text>
            </View>
            <Text style={styles.transactionAmount}>{transaction.value > 0 ? `+ ${VND.format(Number(transaction.value))}` : `- ${VND.format(Number(transaction.value))}`}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: colors.white,
    paddingBottom: 40,
  },
  containerHistory: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  textHistory: {
    color: colors.primary,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    fontFamily: "open-sans",
  },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomColor: colors.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 5,
  },
  transactionDate: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: colors.primary,
  },
  transactionText: {
    fontFamily: "open-sans",
    fontSize: 12,
    color: colors.primary,
  },
  transactionAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    color: colors.primary,
  },
};

export default manage_reports;
