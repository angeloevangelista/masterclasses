import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Scope, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from './components/Form/Input';

import './App.css';

interface IUser {
  name: string;
  email: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    number: number;
  };
}

function App() {
  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    setTimeout(() => {
      formRef.current?.setData({
        email: 'angeloevan.ane@gmail.com',
        name: 'Angelo',
        address: {
          city: 'Praia grande',
          neighborhood: 'Ribeirópolis',
          number: 102482,
          state: 'SP',
          street: 'Av. Nome longo & por extenso',
        },
      });
    }, 2000);
  }, []);

  const handleSubmit = useCallback(async (data: IUser, { reset }) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Digite um email válido')
          .required('O email é obrigatório'),
        address: Yup.object().shape({
          city: Yup.string().min(3, 'Mínimo de 3 caracteres'),
          state: Yup.string().max(2),
        }),
      });

      await schema.validate(data, { abortEarly: false });

      formRef.current?.setErrors({});
      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages: { [key: string]: string } = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current?.setErrors(errorMessages);
      }
    }
  }, []);

  return (
    <div className="App">
      <h1>Hello Unform</h1>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" placeholder="name" />
        <Input type="email" name="email" placeholder="email" />

        <Scope path="address">
          <Input name="street" placeholder="street" />
          <Input name="neighborhood" placeholder="neighborhood" />
          <Input name="city" placeholder="city" />
          <Input name="state" placeholder="state" />
          <Input name="number" placeholder="number" />
        </Scope>

        <button type="submit">Enviar</button>
      </Form>
    </div>
  );
}

export default App;
