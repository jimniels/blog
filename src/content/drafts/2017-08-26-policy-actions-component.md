


---

Original notes on flow and app structure

# Flow

Folder structure:

components/
  App
  FormContainer
  FormContainerError
  Form
  FormButtons
  Edit/
    Edit
    Form
    Error
    ValidationError
    EffectiveDate
    SupplementalData
    Fields
    Field
  Preview/
    Preview
    PreviewError
    PreviewSuccess
    EffecitveDate
    ChangedValues
    NewValues
    AdditionalUploads
    DiscountsAndSurchargesWarning

<FormContainer>
  <FormHeader />
  inputs.isLoading && <Loading />
  !inputs.isLoading && !inputs.length && <FormContainerError />
  !inputs.isLoading && inputs.length && <Form />
</FormContainer>

<Form>
  {transaction.isLoading && <Loading />}
  {!transaction.isLoading && isEdit && <Edit/Edit />}
  {!transaction.isLoading && !isEdit && <Preview/Preview />}

  <FormButtons>
    forms.preview.hasSuccess && formActions.isEdit
      ? 'Preview'
      : 'Submit'
    Cancel
    forms.isEdit
      ? 'Reset'
      : 'Go back'
  </FormButtons>
</Forms>


<Edit>
  formActions.edit.hasError && <Error />
  formActions.edit.hasValidationError && <ValidationError />
  <Static/EffectiveDate />
  <Dynamic/SupplementalPolicyData />
  <Dynamic/ProductFields>
    <Dynamic/ProductFieldRow>
  <Form>
    <EffectiveDate />
    <SupplementalData />
    <DynamicFields />
  </FOrm>
</Edit>

<PreviewContainer>
  form.preview.hasError && <Error />
  form.preview.hasSuccess && <Success />
  form.id == discountsAndsurcharges

  Static/EffectiveDate
  Dynamic/ProposedChanges
    DynamicProposedChangesRow
  Dynamic/DerivedChanges
    DerivedChangesRow
  Static/Attachments
  Static/Comment
  <PreviewForm>
    <EffectiveDate />
    <ChangedValues>
    <NewValues>
  </PreviewForm>
</PreviewContainer>


## Component Mapping

<Edit>

- Supplemental policy

Get fields - LOADING
    <Header />
    isLoading && <Loading />
Get fields - ERROR
    <Header />
    <Error {Try Again} />
    <Buttons {Cancel} />
Get fields - SUCCESS
    <Header />
    <Edit />
    <Buttons {Cancel|Reset|Preview} />
Transaction request (`x-commit: false`) - LOADING
    <Header />
    edit.isLoading && <Loading {withAbort} />
Transaction request (`x-commit: false`) - ERROR
    <Header />
    !edit.isLoading && edit.hasError && <Error />
    !edit.isLoading && edit.hasOverrideValidationError && <OverrideValidation />)
    !edit.isLoading && <Edit />
    <Buttons {Cancel|Reset|Preview} />

<ActionEditContainer>
  isLoading && <Loading />


<Preview />

Transaction request (`x-commit: false`) - SUCCESS
  <Header />
  <Preview />
  <Buttons {Cancel|Go Back|Submit} />
Transaction request (`x-commit: true`) - LOADING
  <Header />
  <Loading /> (no abort??)
Transaction request (`x-commit: true`) - ERROR
  <Header />
  <Error {msg: Try again or call us}/>
  <Preview />
  <Buttons {Cancel|Go Back|Submit} />
Transaction request (`x-commit: true`) - SUCCESS
  <Header />
  <Success />


## Async flow:

1. <App /> Get fields
  A. Loading
  B. Error
    1. Show message with button. User clicks "try again" (back to 1.A.)
  C. Success
    1. Show edit form
2. <Edit /> User clicks "preview"
  A. Loading (NAME???)
    1. User can click "abort" ?
  B. Error
    1. Show error message with "try again" button (back to 2.A.)
    2. Show rate validation override box
  C. Success
    1. Show preview form
3. <Preview /> User clicks "submit"
  A. Loading (NAME???)
    1. User has no option to abort, right?
  B. Error
    1. Show error from server with "try again" button (back to 3.A.)
  C. Success
    1. Show confirmation message, "Done" button (same as onCancel)



=======


<Header />

{state.isEdit
  ? <Edit />
  : <Preview />
}


<Edit>
  <Error />                 fields.error || transactionRequest.error
  <OverrideValidation />    transactionRequest.requiresOverrideValidation
  <Loading abort />
  <Form />
  <Buttons {Cancel|Reset|Preview} />
</Edit>

<Preview>
  <Error /> || <Success />
  <Loading />
  <Form />
  <Buttons {Cancel|Go Back|Submit} /> !transactionRequest.isSuccess
</Preview>



<Buttons>
  <button>Cancel</button>
  <button>isEdit ? Reset : Go Back</button>
  <button>isEdit ? Preview : Submit</button>
</Buttons>

policy: {
  product: {
    id: 'ofcc-ho3-ny'
    logic: [func1, func2]
    fields: [{name: 'Coverage A'}, {name: 'Coverage B'}]
  },
  data: {
    CoverageA: '100000',
    CoverageB: '2500'
  },
  xml: '<xml> string'
}

Fields dynamic by form and product

policy: {
  data: {}
}

collections: {
  inputs: {
    logic: [func1, func2]
    data: [
      {
        label: 'Something'
        inputs: [{name: 'CoverageA'}, {name: 'CoverageB'}]
      }
    ]
  }
  supplemental: {
    data: []
  }
}

product: {
  id: 'ofcc-ho3-ny',
  logic:
},
policy: {
  data: {
    CoverageA: '100000',
    CoverageB: '1500'
  }
},

product: {
  id: 'ofcc-ho3-ny',
  policy: {
    data: {
      CoverageA: '100000',
      CoverageB: '1500'
    }
  },
},

fields.product.data
fields.product.logic
fields.supplemental.data

Policy info

policy.xml
policy.product.id
policy.product.logic
policy.data.CoverageA
policy.data.ConstructionType

policy.product.logic
policy.product.id
policy.currentValues.CoverageA
policy.currentValues.


================================

All fields take a grouped structure, i.e.

[
  {
    "label": "Something",
    "inputs": []
  }
  {
    "label": "",
    "items": []
  }
]

policyData: {...formFields, ...supplementalFields}

Generate policyData
  1. Loop over all `formFields` and look those up
    policyData: { OptionCoverageC: '1500' // 15%}
  2. Loop over all `supplementalFields` and look those up
    supplementalPolicyData: {BarrierIsland: '100' // Yes}

Then when you're rendering the thing, check if the type is `enum` and look it up, or if the type is `currency` then format it.

Is the context ALL supplemental data info? Or does it contain even more info? i.e. can it be used as the source

Supplemental Policy Info

1. Make ajax call to form context (based on an ID, may not be `formId`)
2. If error, show erro
3. If success, you get an XML which will detail all the enumerations for specific fields by key?
4. Create a "supplemental policy data" mapping of key/values based on enumerations.

i.e. policyData enum look ups for fields happen in `fields` while supplementalPolicyData enum look ups happen in the vocabContext.
4.




======= THOUGHTS ON STATE -========

collections: {
    inputs: {
      hasError: BOOL,
      logic: {
        onChangeFuncsDependencies: []
        onChangeFuncsByInputName: {CoverageA: [func1, func2]}
        onLoadFuncs: []
      }
      data: [
        {
          label: 'Section I And II',
          inputs: [
            {name: 'CoverageA'}
            {name: 'CoverageB'}
          ]
        },
        {...}
      ]
    }
    supplementalTerms: {
      isLoading: BOOL,
      hasError: BOOL,
      vocabContextData: {
        ConstructionYear: {
          '100':
        }
      }
      vocabContextXml: ''
      termsData: [ // this is all written locally, part of repo
        {
          label: 'Property Information',
          items: [
            { name: 'ConstructionYear', label: 'Construction Year'}
          ]
        },
        {...}
      ]
    }

entities: {
    logic: {
      onChangeFuncsByName: {
        'CoverageA': [func1]
      }
      onChangeDependencyNames: ['CoverageA']
      onLoadFuncs: [func1, func2]
    }
    inputs: {
      byName: {
        'CoverageA': {name: 'CoverageA', section: 'Section I & II'},
        'CoverageB': {name: 'CoverageA', section: 'Section I & II'}
      },
      allNames: ['CoverageA', 'CoverageB']
    }
    supplementalTerms: {
      byName: {
        'ConstructionYear': {name: "ConsturctionYear", section: 'Label 1'},
        'HomeFeatures1': {name: "HomeFeatures1", section: 'Label 2'}
      }
      allNames: ['ConstructionYear', 'HomeFeatures1']
    },
    policyData: {
      byName: {
        'CoverageA': '1000000'
      }
    }
  }


dispatch FETCH_SUPPLEMENTAL_TERMS_ENUMS_SUCCESS (xml)
dispatch FETCH_SUPPLEMENTAL_TERMS_ENUMS_FAILURE ()
dispatch FETCH_SUPPLEMENTAL_TERMS_ENUMS_TIMEOUT ()

supplementalTerms reducer xml
  case 'SUCCESS'
    isLoading: false,
    hasError: false
entities reducer (xml)
  case 'SUCCESS'
    let byName = {...state.byName};

    state.allNames.forEach(name => {
      const enums = getEnumsForNameFromXml(name, xml);
      if (enums) byName[name].details = enums;
    })

    return {
      allNames [...state.allNames]
      byName: byName
    }

getEnumsForNameFromXml(id, xml)
  return [
    {value: '1000', label: '10%'}
  ]