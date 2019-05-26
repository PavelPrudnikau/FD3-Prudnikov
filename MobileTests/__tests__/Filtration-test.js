"use strict";

import React from 'react';
import renderer from 'react-test-renderer';

import MobileCompany from '../components/MobileCompany';

test('работа Filtration', () => {

  let companyName='Velcom';
  let clientsArr=[ 
    {id:1, fam:"Иванов",    im:"Иван",      otch:"Иванович",    balance:200}, 
    {id:2, fam:"Сидоров",   im:"Сидор",     otch:"Сидорович",   balance:250}, 
    {id:3, fam:"Петров",    im:"Пётр",      otch:"Петрович",    balance:180},
    {id:4, fam:"Григорьев", im:"Григорий",  otch:"Григорьевич", balance:-220},
  ];
  // создаём тестовую версию компонента MobileCompany
  const componentCompany = renderer.create(
    <MobileCompany 
    name={companyName}
    clients={clientsArr}
  />
  );

  // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
  let componentCompanyTree=componentCompany.toJSON();
  expect(componentCompanyTree).toMatchSnapshot();

  // найдём в вёрстке компонента кнопку "Активные"
  const buttonActive = componentCompany.root.find( el => el.type=='input' && el.props.value == 'Активные' ); 
  // и "нажмём" на неё
  buttonActive.props.onClick();

  // получаем уже изменённый снэпшот
  componentCompanyTree=componentCompany.toJSON();
  expect(componentCompanyTree).toMatchSnapshot();

  const buttonAll = componentCompany.root.find( el => el.type=='input' && el.props.value == 'Все' ); 
  // и "нажмём" на неё
  buttonAll.props.onClick();

  // получаем уже изменённый снэпшот
  componentCompanyTree=componentCompany.toJSON();
  expect(componentCompanyTree).toMatchSnapshot();

  // найдём в вёрстке компонента кнопку "Заблокированные"
  const buttonBlocked = componentCompany.root.find( el => el.type=='input' && el.props.value == 'Заблокированные' ); 
  // и "нажмём" на неё
  buttonBlocked.props.onClick();

  // получаем уже изменённый снэпшот
  componentCompanyTree=componentCompany.toJSON();
  expect(componentCompanyTree).toMatchSnapshot();
});
