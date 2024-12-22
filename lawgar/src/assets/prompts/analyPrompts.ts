export interface AnalyPromptProps {
  id: string
  title: string
  prompts: {
    title: string
    prompt: string
    analysis?: {
      status?: 'valid' | 'attention' | 'invalid' | 'pending'
      data?: string
      dataRefined?: string
    }
  }[]
}

export const analyPrompts: AnalyPromptProps[] = [
  {
    id: '1',
    title: 'Contrato de prestação de serviços',
    prompts: [
      {
        title: 'OBJETO',
        prompt:
          'Analise a cláusula de Objeto do contrato de fornecimento, assegurando que ela descreva claramente o escopo do fornecimento de bens e/ou serviços pela CONTRATADA à CONTRATANTE, conforme especificado no Quadro Resumo e no Pedido de Compra. Verifique se o texto está alinhado com as normas legais aplicáveis e as diretrizes normativas da empresa. Confirme se qualquer divergência entre os documentos contratuais é resolvida em favor do presente contrato, priorizando a proteção jurídica da Contratante. Não faça suposições e baseie suas recomendações nas legislações vigentes e nos documentos fornecidos.',
      },
      {
        title: 'CONFIDENCIALIDADE',
        prompt:
          'Analise a cláusula de confidencialidade do contrato, comparando-a com o padrão da Contratante, que já atende aos requisitos necessários, incluindo: proibição de divulgação sem consentimento prévio, uso restrito à execução contratual, proteção de documentos trocados, formalização de informações orais como confidenciais e vigência de 5 anos após o término do contrato. Como a cláusula já segue o padrão, espera-se um status "positivo" sem necessidade de ajustes.',
      },
      {
        title: 'OBRIGAÇÕES DA CONTRATADA',
        prompt:
          'Verifique a cláusula referente às obrigações da contratada, garantindo que todas as responsabilidades estejam claramente definidas e que a cláusula cubra de forma abrangente as seguintes áreas: execução do fornecimento, cumprimento de normas e leis, encargos financeiros, segurança, licenciamento e requisitos de comunicação e conformidade. Certifique-se de que a cláusula esteja bem detalhada, sem contradições ou lacunas, e que todas as obrigações práticas, legais e de segurança estejam completamente cobertas, incluindo responsabilidades trabalhistas, fiscais, tributárias e regulatórias. Além disso, a cláusula deve incluir uma definição clara de penalidades em caso de descumprimento e garantir a proteção dos interesses da contratante. A cláusula deve estar em conformidade com as leis aplicáveis e com os documentos normativos internos da empresa contratante, garantindo que todas as obrigações sejam atendidas de maneira precisa e sem margem para interpretações que possam prejudicar a contratante.',
      },
      {
        title: 'PREÇO',
        prompt:
          'Verifique a cláusula referente ao preço, garantindo que ela atenda aos seguintes requisitos: a definição clara do valor acordado, que deve ser fixo, com exceção de reajustes expressamente autorizados pela contratante; a estipulação de um valor estimado anual, com a devida advertência de que a contratada não possui direito adquirido sobre esse valor, caso os pedidos de compra não atinjam o valor estimado; a inclusão dos custos totais relacionados ao fornecimento, incluindo transporte, frete e embalagem adequada para proteção durante o transporte. Certifique-se de que a cláusula esteja bem detalhada, sem contradições ou lacunas, e que todos os aspectos relacionados ao preço e seus ajustes sejam claramente definidos, garantindo a proteção dos interesses da contratante. A cláusula deve estar em conformidade com as leis aplicáveis e com os documentos normativos internos da empresa contratante.',
      },
      {
        title: 'PENALIDADES',
        prompt:
          'Analise a cláusula de penalidades no Contrato de Fornecedor e verifique se ela cobre os principais elementos da cláusula padrão da Contratante, incluindo: multas diárias de 0,5% por atraso (limitadas a 15%), critérios de cálculo das penalidades conforme o valor da aquisição ou de itens específicos, aplicação de sanções adicionais (como retenção de pagamentos) e ressarcimento por eventuais multas de órgãos reguladores.',
      },
      {
        title: 'RESCISÃO',
        prompt:
          'Analise a cláusula de rescisão no contrato de fornecedor, comparando-a com a minuta padrão da Contratante. Verifique se as condições de rescisão, como falência, inadimplemento, má qualidade, abandono do contrato e operações societárias, entre outras, estão adequadamente contempladas, conforme a minuta padrão da empresa. Certifique-se de que a cláusula está em conformidade com as leis aplicáveis e os documentos normativos internos da empresa Contratante. Os Contratos firmados pelas empresas do Grupo Algar não devem conter disposições que restrinjam direta ou indiretamente quaisquer alterações societárias ou a distribuição de dividendos envolvendo a própria contratante e/ou suas controladas e controladoras, ou ainda alteração do objeto social e/ou de seu patrimônio líquido e/ou alteração do quadro de administradores e acionistas/sócios.',
      },
      {
        title: 'VIGÊNCIA',
        prompt:
          'A cláusula de vigência deve estabelecer um prazo determinado, evitando prazos indeterminados ou renovação automática, que podem causar incertezas jurídicas e dificultar a revisão ou renegociação do contrato. Caso a minuta do fornecedor preveja prazos indeterminados ou renovação automática, é necessário ajustar a cláusula para incluir um prazo fixo e especificar que a renovação dependerá de termo aditivo assinado por ambas as partes. Essa alteração visa garantir flexibilidade, conformidade com as políticas internas e segurança jurídica para a Contratante ',
      },
    ],
  },
]
