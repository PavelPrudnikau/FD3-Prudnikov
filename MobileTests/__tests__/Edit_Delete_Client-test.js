"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { mount } from 'enzyme';

import MobileCompany from '../components/MobileCompany';

test('Тест Edit и Delete кнопок', () => {

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
  
  //нажимаем кнопку Edit для первого клиента и проверяем рендер компонента ClientInfo
  componentCompany.find('.MobileClient').find({ id: 1 }).find('.EditButton').simulate('click');
  expect (componentCompany.find('.ClientInfo').length).toBe(1);

  //нажимаем кнопку Delete и проверяем что количество клиентов уменьшилось
  componentCompany.find('.MobileClient').find({ id: 1 }).find('.DeleteButton').simulate('click');
  expect (componentCompany.state('clients').length).toBe(3);

});
