import React, { Component } from 'react';
import { Picker } from 'react-native';

const ProvincePicker = ({selectProvince,onChangeProvince}) => {
  return(
    <Picker
        selectedValue={selectProvince}
        onValueChange={onChangeProvince}
      >
        <Picker.Item label="กรุงเทพมหานคร" value="กรุงเทพมหานคร" />
        <Picker.Item label="กระบี่" value="กระบี่" />
        <Picker.Item label="กาญจนบุรี" value="กาญจนบุรี" />
        <Picker.Item label="กาฬสินธุ์" value="กาฬสินธุ์" />
        <Picker.Item label="กำแพงเพชร" value="กำแพงเพชร" />
        <Picker.Item label="ขอนแก่น" value="ขอนแก่น" />
        <Picker.Item label="จันทบุรี" value="จันทบุรี" />
        <Picker.Item label="ฉะเชิงเทรา" value="ฉะเชิงเทรา" />
        <Picker.Item label="ชลบุรี" value="ชลบุรี" />
        <Picker.Item label="ชัยนาท" value="ชัยนาท" />
        <Picker.Item label="ชัยภูมิ" value="ชัยภูมิ" />
        <Picker.Item label="ชุมพร" value="ชุมพร" />
        <Picker.Item label="เชียงราย" value="เชียงราย" />
        <Picker.Item label="เชียงใหม่" value="เชียงใหม่" />
        <Picker.Item label="ตรัง" value="ตรัง" />
        <Picker.Item label="ตราด" value="ตราด" />
        <Picker.Item label="ตาก" value="ตาก" />
        <Picker.Item label="นครนายก" value="นครนายก" />
        <Picker.Item label="นครปฐม" value="นครปฐม" />
        <Picker.Item label="นครพนม" value="นครพนม" />
        <Picker.Item label="นครราชสีมา" value="นครราชสีมา" />
        <Picker.Item label="นครศรีธรรมราช" value="นครศรีธรรมราช" />
        <Picker.Item label="นครสวรรค์" value="นครสวรรค์" />
        <Picker.Item label="นนทบุรี" value="นนทบุรี" />
        <Picker.Item label="นราธิวาส" value="นราธิวาส" />
        <Picker.Item label="น่าน" value="น่าน" />
        <Picker.Item label="บึงกาฬ" value="บึงกาฬ" />
        <Picker.Item label="บุรีรัมย์" value="บุรีรัมย์" />
        <Picker.Item label="ปทุมธานี" value="ปทุมธานี" />
        <Picker.Item label="ประจวบคีรีขันธ์" value="ประจวบคีรีขันธ์" />
        <Picker.Item label="ปราจีนบุรี" value="ปราจีนบุรี" />
        <Picker.Item label="ปัตตานี" value="ปัตตานี" />
        <Picker.Item label="พระนครศรีอยุธยา" value="พระนครศรีอยุธยา" />
        <Picker.Item label="พังงา" value="พังงา" />
        <Picker.Item label="พัทลุง" value="พัทลุง" />
        <Picker.Item label="พิจิตร" value="พิจิตร" />
        <Picker.Item label="พิษณุโลก" value="พิษณุโลก" />
        <Picker.Item label="เพชรบุรี" value="เพชรบุรี" />
        <Picker.Item label="เพชรบูรณ์" value="เพชรบูรณ์" />
        <Picker.Item label="แพร่" value="แพร่" />
        <Picker.Item label="พะเยา" value="พะเยา" />
        <Picker.Item label="ภูเก็ต" value="ภูเก็ต" />
        <Picker.Item label="มหาสารคาม" value="มหาสารคาม" />
        <Picker.Item label="มุกดาหาร" value="มุกดาหาร" />
        <Picker.Item label="แม่ฮ่องสอน" value="แม่ฮ่องสอน" />
        <Picker.Item label="ยะลา" value="ยะลา" />
        <Picker.Item label="ยโสธร" value="ยโสธร" />
        <Picker.Item label="ร้อยเอ็ด" value="ร้อยเอ็ด" />
        <Picker.Item label="ระนอง" value="ระนอง" />
        <Picker.Item label="ระยอง" value="ระยอง" />
        <Picker.Item label="ราชบุรี" value="ราชบุรี" />
        <Picker.Item label="ลพบุรี" value="ลพบุรี" />
        <Picker.Item label="ลำปาง" value="ลำปาง" />
        <Picker.Item label="ลำพูน" value="ลำพูน" />
        <Picker.Item label="เลย" value="เลย" />
        <Picker.Item label="ศรีสะเกษ" value="ศรีสะเกษ" />
        <Picker.Item label="สกลนคร" value="สกลนคร" />
        <Picker.Item label="สงขลา" value="สงขลา" />
        <Picker.Item label="สตูล" value="สตูล" />
        <Picker.Item label="สมุทรปราการ" value="สมุทรปราการ" />
        <Picker.Item label="สมุทรสงคราม" value="สมุทรสงคราม" />
        <Picker.Item label="สมุทรสาคร" value="สมุทรสาคร" />
        <Picker.Item label="สระแก้ว" value="สระแก้ว" />
        <Picker.Item label="สระบุรี" value="สระบุรี" />
        <Picker.Item label="สิงห์บุรี" value="สิงห์บุรี" />
        <Picker.Item label="สุโขทัย" value="สุโขทัย" />
        <Picker.Item label="สุพรรณบุรี" value="สุพรรณบุรี" />
        <Picker.Item label="สุราษฎร์ธานี" value="สุราษฎร์ธานี" />
        <Picker.Item label="สุรินทร์" value="สุรินทร์" />
        <Picker.Item label="หนองคาย" value="หนองคาย" />
        <Picker.Item label="หนองบัวลำภู" value="หนองบัวลำภู" />
        <Picker.Item label="อ่างทอง" value="อ่างทอง" />
        <Picker.Item label="อุดรธานี" value="อุดรธานี" />
        <Picker.Item label="อุทัยธานี" value="อุทัยธานี" />
        <Picker.Item label="อุตรดิตถ์" value="อุตรดิตถ์" />
        <Picker.Item label="อุบลราชธานี" value="อุบลราชธานี" />
        <Picker.Item label="อำนาจเจริญ" value="อำนาจเจริญ" />
      </Picker>
  );
}

/*class ProvincePicker extends Component {
  render = ({province}) => {
    return (
      <Picker
        selectedValue={province}
        onValueChange={(itemValue, itemIndex) => {this.province} }
      >
        <Picker.Item label="กรุงเทพมหานคร" value="กรุงเทพมหานคร" />
        <Picker.Item label="กระบี่" value="กระบี่" />
        <Picker.Item label="กาญจนบุรี" value="กาญจนบุรี" />
        <Picker.Item label="กาฬสินธุ์" value="กาฬสินธุ์" />
        <Picker.Item label="กำแพงเพชร" value="กำแพงเพชร" />
        <Picker.Item label="ขอนแก่น" value="ขอนแก่น" />
        <Picker.Item label="จันทบุรี" value="จันทบุรี" />
        <Picker.Item label="ฉะเชิงเทรา" value="ฉะเชิงเทรา" />
        <Picker.Item label="ชลบุรี" value="ชลบุรี" />
        <Picker.Item label="ชัยนาท" value="ชัยนาท" />
        <Picker.Item label="ชัยภูมิ" value="ชัยภูมิ" />
        <Picker.Item label="ชุมพร" value="ชุมพร" />
        <Picker.Item label="เชียงราย" value="เชียงราย" />
        <Picker.Item label="เชียงใหม่" value="เชียงใหม่" />
        <Picker.Item label="ตรัง" value="ตรัง" />
        <Picker.Item label="ตราด" value="ตราด" />
        <Picker.Item label="ตาก" value="ตาก" />
        <Picker.Item label="นครนายก" value="นครนายก" />
        <Picker.Item label="นครปฐม" value="นครปฐม" />
        <Picker.Item label="นครพนม" value="นครพนม" />
        <Picker.Item label="นครราชสีมา" value="นครราชสีมา" />
        <Picker.Item label="นครศรีธรรมราช" value="นครศรีธรรมราช" />
        <Picker.Item label="นครสวรรค์" value="นครสวรรค์" />
        <Picker.Item label="นนทบุรี" value="นนทบุรี" />
        <Picker.Item label="นราธิวาส" value="นราธิวาส" />
        <Picker.Item label="น่าน" value="น่าน" />
        <Picker.Item label="บึงกาฬ" value="บึงกาฬ" />
        <Picker.Item label="บุรีรัมย์" value="บุรีรัมย์" />
        <Picker.Item label="ปทุมธานี" value="ปทุมธานี" />
        <Picker.Item label="ประจวบคีรีขันธ์" value="ประจวบคีรีขันธ์" />
        <Picker.Item label="ปราจีนบุรี" value="ปราจีนบุรี" />
        <Picker.Item label="ปัตตานี" value="ปัตตานี" />
        <Picker.Item label="พระนครศรีอยุธยา" value="พระนครศรีอยุธยา" />
        <Picker.Item label="พังงา" value="พังงา" />
        <Picker.Item label="พัทลุง" value="พัทลุง" />
        <Picker.Item label="พิจิตร" value="พิจิตร" />
        <Picker.Item label="พิษณุโลก" value="พิษณุโลก" />
        <Picker.Item label="เพชรบุรี" value="เพชรบุรี" />
        <Picker.Item label="เพชรบูรณ์" value="เพชรบูรณ์" />
        <Picker.Item label="แพร่" value="แพร่" />
        <Picker.Item label="พะเยา" value="พะเยา" />
        <Picker.Item label="ภูเก็ต" value="ภูเก็ต" />
        <Picker.Item label="มหาสารคาม" value="มหาสารคาม" />
        <Picker.Item label="มุกดาหาร" value="มุกดาหาร" />
        <Picker.Item label="แม่ฮ่องสอน" value="แม่ฮ่องสอน" />
        <Picker.Item label="ยะลา" value="ยะลา" />
        <Picker.Item label="ยโสธร" value="ยโสธร" />
        <Picker.Item label="ร้อยเอ็ด" value="ร้อยเอ็ด" />
        <Picker.Item label="ระนอง" value="ระนอง" />
        <Picker.Item label="ระยอง" value="ระยอง" />
        <Picker.Item label="ราชบุรี" value="ราชบุรี" />
        <Picker.Item label="ลพบุรี" value="ลพบุรี" />
        <Picker.Item label="ลำปาง" value="ลำปาง" />
        <Picker.Item label="ลำพูน" value="ลำพูน" />
        <Picker.Item label="เลย" value="เลย" />
        <Picker.Item label="ศรีสะเกษ" value="ศรีสะเกษ" />
        <Picker.Item label="สกลนคร" value="สกลนคร" />
        <Picker.Item label="สงขลา" value="สงขลา" />
        <Picker.Item label="สตูล" value="สตูล" />
        <Picker.Item label="สมุทรปราการ" value="สมุทรปราการ" />
        <Picker.Item label="สมุทรสงคราม" value="สมุทรสงคราม" />
        <Picker.Item label="สมุทรสาคร" value="สมุทรสาคร" />
        <Picker.Item label="สระแก้ว" value="สระแก้ว" />
        <Picker.Item label="สระบุรี" value="สระบุรี" />
        <Picker.Item label="สิงห์บุรี" value="สิงห์บุรี" />
        <Picker.Item label="สุโขทัย" value="สุโขทัย" />
        <Picker.Item label="สุพรรณบุรี" value="สุพรรณบุรี" />
        <Picker.Item label="สุราษฎร์ธานี" value="สุราษฎร์ธานี" />
        <Picker.Item label="สุรินทร์" value="สุรินทร์" />
        <Picker.Item label="หนองคาย" value="หนองคาย" />
        <Picker.Item label="หนองบัวลำภู" value="หนองบัวลำภู" />
        <Picker.Item label="อ่างทอง" value="อ่างทอง" />
        <Picker.Item label="อุดรธานี" value="อุดรธานี" />
        <Picker.Item label="อุทัยธานี" value="อุทัยธานี" />
        <Picker.Item label="อุตรดิตถ์" value="อุตรดิตถ์" />
        <Picker.Item label="อุบลราชธานี" value="อุบลราชธานี" />
        <Picker.Item label="อำนาจเจริญ" value="อำนาจเจริญ" />
      </Picker>
    );
}
}*/

export {ProvincePicker};
