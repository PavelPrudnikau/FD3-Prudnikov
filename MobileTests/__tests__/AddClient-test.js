"use strict";

import React from 'react';
import { configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { mount } from 'enzyme';

import MobileCompany from '../components/MobileCompany';


test('работа AddClient', () => {

  let companyName='Velcom';
  let clientsArr=[ 
    {id:1, fam:"Иванов",    im:"Иван",      otch:"Иванович",    balance:200}, 
    {id:2, fam:"Сидоров",   im:"Сидор",     otch:"Сидорович",   balance:250}, 
    {id:3, fam:"Петров",    im:"Пётр",      otch:"Петрович",    balance:180},
    {id:4, fam:"Григорьев", im:"Григорий",  otch:"Григорьевич", balance:-220},
  ];
  // создаём тестовую версию компонента MobileCompany
  let componentCompany = mount(
    <MobileCompany 
      name={companyName}
      clients={clientsArr}
    />
  );
  
  componentCompany.find('.addButton').simulate('click');

  componentCompany.find('.ClientInfo').find('input').find({ id: 'family' }).simulate("change", { target: { value: 'test', id: 'family'}});
  componentCompany.find('.ClientInfo').find('input').find({ id: 'name' }).simulate("change", { target: { value: 'test', id: 'name'}});
  componentCompany.find('.ClientInfo').find('input').find({ id: 'otch' }).simulate("change", { target: { value: 'test', id: 'otch'}});
  componentCompany.find('.ClientInfo').find('input').find({ id: 'balance' }).simulate("change", { target: { value: 555, id: 'balance'}});    

  componentCompany.find('.ClientInfo').find('#addNewClient').simulate('click');

  expect (componentCompany.find('.MobileClient').length).toBe(5);
  expect (componentCompany.state('clients').length).toBe(5);
});
