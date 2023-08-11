import React from 'react'

import { Input, HelperText, Label, Select, Textarea, Button } from '@roketid/windmill-react-ui'
import CTA from 'example/components/CTA'
import PageTitle from 'example/components/Typography/PageTitle'
import SectionTitle from 'example/components/Typography/SectionTitle'

import Layout from 'example/containers/Layout'
import { MailIcon } from 'icons'

function Grievance() {
  return (
    <Layout>
      <PageTitle>Reclamação/Queixa</PageTitle>
      <SectionTitle>Registre sua reclamação/queixa</SectionTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Título</span>
          <Input className="mt-1" placeholder="Informe um título para a reclamação/queixa" />
        </Label>

        <Label className="mt-4">
          <span>Categoria da Reclamação</span>
          <Select className="mt-1">
            <option>-- Informe qual o motivo da reclamação --</option>
            <option>Barulho Excessivo</option>
            <option>Bagunça</option>
            <option>Desreipeito</option>
            <option>Sujeira</option>
            <option>Palavras Obcenas</option>
            <option>Prefiro não informar</option>
          </Select>
        </Label>        

        <Label className="mt-4">
          <span>Reclamação/Queixa</span>
          <Textarea className="mt-1" rows={10} placeholder="Descreva sua reclamação/queixa com o máximo de detalhes possíveis." />
        </Label>

        <Label className="mt-6" check>
          <Input type="checkbox" />
          <span className="ml-2">
            Manter o anonimato na Reclamação/Queixa? <span className="underline">políticas de privacidade</span>
          </span>
        </Label>

          <div className="flex flex-col flex-wrap space-y-4 md:flex-row md:items-end md:space-x-4 px-4 py-3 mb-6">
          {/* <div className="flex flex-col flex-wrap mb-8 space-y-4 md:flex-row md:items-end md:space-x-4"> */}
            <div>
              <Button className="bg-lime-600 hover:bg-lime-500" size="larger">Registrar</Button>
            </div>
            <div>
              <Button className="bg-red-700 hover:bg-red-600" size="larger">Cancelar</Button>
            </div>           
          </div>

      </div>
    </Layout>
  )
}

export default Grievance
