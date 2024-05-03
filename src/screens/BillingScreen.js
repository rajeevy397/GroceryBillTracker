import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { IconButton } from 'react-native-paper';
import FallBack from '../components/FallBack';

const BillingScreen = () => {
  const [Expenditure, SetExpenditure] = useState('');
  const [ExpenditureList, SetExpenditureList] = useState([]);
  const [EditedExpenditure, SetEditedExpenditure] = useState(null);

  const handleAddExpenditure = () => {

    if(Expenditure === ""){
      return;
    }
    SetExpenditureList([
      ...ExpenditureList,
      { id: Date.now().toString(), title: Expenditure },
    ]);
    SetExpenditure('');
  };

  const handleDeleteExpenditure = (id) => {
    const updatedExpenditureList = ExpenditureList.filter(
      (Expenditure) => Expenditure.id !== id
    );
    SetExpenditureList(updatedExpenditureList);
  };

  const handleEditExpenditure = (expenditure) => {
    SetEditedExpenditure(expenditure);
    SetExpenditure(expenditure.title);
  };

  const handleUpdateExpenditure = () => {
    const updatedExpenditure = ExpenditureList.map((item) => {
      if (item.id === EditedExpenditure.id) {
        return { ...item, title: Expenditure };
      }

      return item;
    });
    SetExpenditureList(updatedExpenditure);
    SetEditedExpenditure(null);
    SetExpenditure('');
  };

  const renderBills = ({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: '#1e90ff',
          borderRadius: 6,
          paddingVertical: 8,
          paddingHorizontal: 6,
          marginBottom: 12,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 3,
          // elevation:
        }}
      >
        <Text
          style={{ color: '#fff', fontSize: 20, fontWeight: '800', flex: 1 }}
        >
          {item.title}
        </Text>
        <IconButton
          icon="pencil"
          iconColor="#fff"
          onPress={() => handleEditExpenditure(item)}
        />
        <IconButton
          icon="trash-can"
          iconColor="#fff"
          onPress={() => handleDeleteExpenditure(item.id)}
        />
      </View>
    );
  };

  return (
    <View style={{ marginHorizontal: 16 }}>
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: '#1e90ff',
          borderRadius: 6,
          paddingVertical: 12,
          paddingHorizontal: 16,
          marginTop: 45,
        }}
        placeholder="Add a Expenditure"
        value={Expenditure}
        onChangeText={(userText) => SetExpenditure(userText)}
      />

      {EditedExpenditure ? (
        <TouchableOpacity
          style={{
            backgroundColor: '#000',
            borderRadius: 6,
            paddingVertical: 12,
            marginTop: 24,
            alignItems: 'center',
            marginBottom: 34,
          }}
          onPress={() => handleUpdateExpenditure()}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>
            Save
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: '#000',
            borderRadius: 6,
            paddingVertical: 12,
            marginTop: 24,
            alignItems: 'center',
            marginBottom: 34,
          }}
          onPress={() => handleAddExpenditure()}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>
            Add
          </Text>
        </TouchableOpacity>
      )}

      <FlatList data={ExpenditureList} renderItem={renderBills} />

      {ExpenditureList.length <= 0 && <FallBack />}
    </View>
  );
};

export default BillingScreen;

const styles = StyleSheet.create({});
