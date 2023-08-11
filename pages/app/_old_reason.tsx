import React from 'react'

import { Input, HelperText, Label, Select, Textarea, Button } from '@roketid/windmill-react-ui'
import CTA from 'example/components/CTA'
import PageTitle from 'example/components/Typography/PageTitle'
import SectionTitle from 'example/components/Typography/SectionTitle'

import Layout from 'example/containers/Layout'
import { MailIcon } from 'icons'

function Reason() {
  return (
    <Layout>
      <PageTitle>Motivo da Reclamação</PageTitle>
      <SectionTitle>Cadastro de motivos</SectionTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Nome</span>
          <Input className="mt-1" placeholder="Informe o nome da categoria" />
        </Label>

        <Label>
          <span>Descrição</span>
          <Input className="mt-1" placeholder="Informe a descrição com mais detalhes sobre a categoria" />
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

export default Reason
