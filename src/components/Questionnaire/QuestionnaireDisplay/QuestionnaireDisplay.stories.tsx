// StoryBook
import { Meta, StoryObj } from "@storybook/react";
// React
import React from "react";
// Component
import QuestionnaireDisplay, { QuestionnaireDisplayProps } from "./QuestionnaireDisplay";

// Used to define the story title in the storybook
interface StoryMeta extends Meta {
    component: React.FC<QuestionnaireDisplayProps>;
    title: string;
}

const meta: StoryMeta = {
    title: "Components/QuestionnaireDisplay",
    component: QuestionnaireDisplay,
};

export default meta;

const Template: StoryObj<QuestionnaireDisplayProps> = {
    render: (args) => <QuestionnaireDisplay {...args} />,
};

const qr = {
    "resourceType": "QuestionnaireResponse",
    "id": "117",
    "contained": [
        {
            "resourceType": "Questionnaire",
            "id": "Q-SV21",
            "meta": {
                "profile": [
                    "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-extr-defn"
                ]
            },
            "url": "http://hl7.eu/fhir/ig/flute/Questionnaire/Q-SV21",
            "version": "2.1.0",
            "name": "StudyVariableExtraction",
            "title": "Study variable Extraction 2.1.0",
            "status": "active",
            "experimental": true,
            "subjectType": ["Patient"],
            "date": "2025-10-22",
            "description": "Study variable extractable questionnaire",
            "item": [
                {
                    "linkId": "g-proc",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-Biopsy#Procedure",
                    "text": "Procedure Biopsy group",
                    "type": "group",
                    "required": false,
                    "item": [
                        {
                            "linkId": "type-of-biopsy",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-Biopsy#Procedure.category.coding",
                            "text": "Type of biopsy",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "answerValueSet": "http://hl7.eu/fhir/ig/flute/ValueSet/VS-BiopsyType"
                        },
                        {
                            "linkId": "procedure-status",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-Biopsy#Procedure.status",
                            "code": [
                                {
                                    "system": "http://snomed.info/sct",
                                    "code": "86273004"
                                }
                            ],
                            "text": "Status",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://hl7.org/fhir/event-status",
                                        "code": "completed"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        },
                        {
                            "linkId": "biopsy-date",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-Biopsy#Procedure.performedDateTime",
                            "text": "Date when the biopsy was performed",
                            "type": "dateTime",
                            "required": true,
                            "repeats": false
                        },
                        {
                            "linkId": "biopsy",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-Biopsy#Procedure.code.coding",
                            "text": "Biopsy",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://snomed.info/sct",
                                        "code": "86273004",
                                        "display": "Biopsy"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        },
                        {
                            "linkId": "biopsy-bodySite",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-Biopsy#Procedure.bodySite.coding",
                            "code": [
                                {
                                    "system": "http://snomed.info/sct",
                                    "code": "86273004"
                                }
                            ],
                            "text": "Biopsy bodySite",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://snomed.info/sct",
                                        "code": "41216001",
                                        "display": "Prostatic structure (body structure)"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        }
                    ]
                },
                {
                    "linkId": "g-fam-hist",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateCancerFamilyHistory#FamilyMemberHistory",
                    "code": [
                        {
                            "system": "http://snomed.info/sct",
                            "code": "399068003"
                        }
                    ],
                    "text": "Family history group",
                    "type": "group",
                    "required": false,
                    "item": [
                        {
                            "linkId": "family-history-pca",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateCancerFamilyHistory#FamilyMemberHistory.condition.code.coding",
                            "text": "Family history of prostate cancer",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "answerValueSet": "http://hl7.eu/fhir/ig/flute/ValueSet/VS-PCa"
                        },
                        {
                            "linkId": "family-status",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateCancerFamilyHistory#FamilyMemberHistory.status",
                            "text": "Family Status",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://hl7.org/fhir/history-status",
                                        "code": "completed"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        },
                        {
                            "linkId": "family-relationship",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateCancerFamilyHistory#FamilyMemberHistory.relationship.coding",
                            "text": "Family relationship",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
                                        "code": "FAMMEMB"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        }
                    ]
                },
                {
                    "linkId": "g-obs-psa",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateSpecificAntigen#Observation",
                    "text": "Observation PSA group",
                    "type": "group",
                    "required": false,
                    "item": [
                        {
                            "linkId": "psa",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateSpecificAntigen#Observation.value",
                            "code": [
                                {
                                    "system": "http://loinc.org",
                                    "code": "2857-1"
                                }
                            ],
                            "text": "Measure of prostate-specific antigen reported in ng/ml",
                            "type": "quantity",
                            "required": true,
                            "repeats": false
                        },
                        {
                            "linkId": "psa-code",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateSpecificAntigen#Observation.code.coding",
                            "text": "PSA code",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://loinc.org",
                                        "code": "2857-1",
                                        "display": "Prostate specific Ag [Mass/volume] in Serum or Plasma"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        },
                        {
                            "linkId": "psa-status",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateSpecificAntigen#Observation.status",
                            "code": [
                                {
                                    "system": "http://loinc.org",
                                    "code": "2857-1"
                                }
                            ],
                            "text": "PSA Status",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://hl7.org/fhir/observation-status",
                                        "code": "final"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        }
                    ]
                },
                {
                    "linkId": "g-proc-dre",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-DigitalRectalExamination#Procedure",
                    "text": "Procedure DRE group",
                    "type": "group",
                    "required": false,
                    "item": [
                        {
                            "linkId": "dre",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-DigitalRectalExamination#Procedure.outcome.coding",
                            "code": [
                                {
                                    "system": "http://snomed.info/sct",
                                    "code": "410006001"
                                }
                            ],
                            "text": "Results of digital rectal examination",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "answerValueSet": "http://hl7.eu/fhir/ig/flute/ValueSet/VS-DREOutcomeCode"
                        },
                        {
                            "linkId": "dre-code",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-DigitalRectalExamination#Procedure.code.coding",
                            "text": "DRE code",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://snomed.info/sct",
                                        "code": "410006001",
                                        "display": "DRE - Digital rectal examination"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        },
                        {
                            "linkId": "dre-status",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-DigitalRectalExamination#Procedure.status",
                            "code": [
                                {
                                    "system": "http://snomed.info/sct",
                                    "code": "410006001"
                                }
                            ],
                            "text": "DRE Status",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://hl7.org/fhir/event-status",
                                        "code": "completed"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        },
                        {
                            "linkId": "dre-bodySite",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-DigitalRectalExamination#Procedure.bodySite.coding",
                            "text": "DRE bodySite",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://snomed.info/sct",
                                        "code": "41216001",
                                        "display": "Prostate"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        }
                    ]
                },
                {
                    "linkId": "g-obs-prost-vol",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateVolume#Observation",
                    "text": "Observation Prostate Volume group",
                    "type": "group",
                    "required": false,
                    "item": [
                        {
                            "linkId": "prostate-volume",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateVolume#Observation.value",
                            "code": [
                                {
                                    "system": "http://snomed.info/sct",
                                    "code": "41216001"
                                }
                            ],
                            "text": "Prostate volume in cc",
                            "type": "quantity",
                            "required": true,
                            "repeats": false
                        },
                        {
                            "linkId": "prostate-code",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateVolume#Observation.code.coding",
                            "text": "Prostate volume code",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://snomed.info/sct",
                                        "code": "1297142007",
                                        "display": "Volume of prostate"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        },
                        {
                            "linkId": "prostate-status",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateVolume#Observation.status",
                            "code": [
                                {
                                    "system": "http://snomed.info/sct",
                                    "code": "41216001"
                                }
                            ],
                            "text": "Prostate volume Status",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://hl7.org/fhir/observation-status",
                                        "code": "final"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        },
                        {
                            "linkId": "prostate-bodySite",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateVolume#Observation.bodySite.coding",
                            "text": "Prostate volume bodySite",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://snomed.info/sct",
                                        "code": "41216001",
                                        "display": "Prostate"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        }
                    ]
                },
                {
                    "linkId": "g-obs-pirads",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-PIRADSScore#Observation",
                    "text": "Observation PI-RADS group",
                    "type": "group",
                    "required": false,
                    "item": [
                        {
                            "linkId": "pirads",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-PIRADSScore#Observation.valueCodeableConcept.coding",
                            "code": [
                                {
                                    "system": "http://snomed.info/sct",
                                    "code": "719178004"
                                }
                            ],
                            "text": "PI-RADS score",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://hl7.eu/fhir/ig/flute/CodeSystem/COS-PIRADSScore",
                                        "code": "1",
                                        "display": "Very low"
                                    }
                                },
                                {
                                    "valueCoding": {
                                        "system": "http://hl7.eu/fhir/ig/flute/CodeSystem/COS-PIRADSScore",
                                        "code": "2",
                                        "display": "Low"
                                    }
                                },
                                {
                                    "valueCoding": {
                                        "system": "http://hl7.eu/fhir/ig/flute/CodeSystem/COS-PIRADSScore",
                                        "code": "3",
                                        "display": "Intermediate"
                                    }
                                },
                                {
                                    "valueCoding": {
                                        "system": "http://hl7.eu/fhir/ig/flute/CodeSystem/COS-PIRADSScore",
                                        "code": "4",
                                        "display": "High"
                                    }
                                },
                                {
                                    "valueCoding": {
                                        "system": "http://hl7.eu/fhir/ig/flute/CodeSystem/COS-PIRADSScore",
                                        "code": "5",
                                        "display": "Very high"
                                    }
                                }
                            ]
                        },
                        {
                            "linkId": "pirads-code",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-PIRADSScore#Observation.code.coding",
                            "text": "PI-RADS code",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://snomed.info/sct",
                                        "code": "719178004",
                                        "display": "Multiparametric magnetic resonance imaging of prostate"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        },
                        {
                            "linkId": "pirads-status",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-PIRADSScore#Observation.status",
                            "code": [
                                {
                                    "system": "http://snomed.info/sct",
                                    "code": "719178004"
                                }
                            ],
                            "text": "PI-RADS Status",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://hl7.org/fhir/observation-status",
                                        "code": "final"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        }
                    ]
                },
                {
                    "linkId": "g-imag",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy",
                    "text": "Imaging Study group",
                    "type": "group",
                    "required": false,
                    "item": [
                        {
                            "linkId": "study-id-system",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.identifier.system",
                            "text": "Study ID System",
                            "type": "url",
                            "required": true,
                            "repeats": false
                        },
                        {
                            "linkId": "study-id-value",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.identifier.value",
                            "text": "Study ID value",
                            "type": "string",
                            "required": true,
                            "repeats": false
                        },
                        {
                            "linkId": "imagingstudy-status",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.status",
                            "text": "Study Status",
                            "type": "choice",
                            "required": true,
                            "repeats": false,
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://hl7.org/fhir/imagingstudy-status",
                                        "code": "available"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        },
                        {
                            "linkId": "imagingstudy-started",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.started",
                            "text": "Study Started DateTime",
                            "type": "dateTime",
                            "required": true,
                            "repeats": false
                        },
                        {
                            "linkId": "imagingstudy-endpoint",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.endpoint.display",
                            "text": "Study DICOM URL Endpoint",
                            "type": "string",
                            "required": true,
                            "repeats": false
                        },
                        {
                            "linkId": "g-imaging-series",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series",
                            "text": "Imaging Study Series group",
                            "type": "group",
                            "required": false,
                            "repeats": true,
                            "item": [
                                {
                                    "linkId": "imagingstudy-series-uid",
                                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[+].uid",
                                    "text": "Study Series UID",
                                    "type": "string",
                                    "required": true,
                                    "repeats": false
                                },
                                {
                                    "linkId": "imagingstudy-series-modality",
                                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[=].modality",
                                    "text": "Study Series Modality",
                                    "type": "choice",
                                    "required": true,
                                    "repeats": false,
                                    "answerValueSet": "http://dicom.nema.org/medical/dicom/current/output/chtml/part16/sect_CID_29.html"
                                },
                                {
                                    "linkId": "g-imaging-instance",
                                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.instance",
                                    "text": "Imaging Study Instance group",
                                    "type": "group",
                                    "required": false,
                                    "repeats": true,
                                    "item": [
                                        {
                                            "linkId": "imagingstudy-instance-uid",
                                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[=].instance[+].uid",
                                            "text": "Study instance UID",
                                            "type": "string",
                                            "required": true,
                                            "repeats": false
                                        },
                                        {
                                            "linkId": "imagingstudy-instance-class",
                                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[=].instance[=].sopClass",
                                            "text": "Study instance SOP Class",
                                            "type": "choice",
                                            "required": true,
                                            "repeats": false,
                                            "answerValueSet": "http://hl7.eu/fhir/ig/flute/ValueSet/VS-SOPClass"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "linkId": "imagingstudy-note",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.note.text",
                            "text": "Any metadata relevant to filter the dataset before ML training",
                            "type": "string",
                            "required": false,
                            "repeats": false
                        }
                    ]
                }
            ]
        }
    ],
    "questionnaire": "#Q-SV21",
    "status": "in-progress",
    "subject": {
        "reference": "Patient/patient-1"
    },
    "item": [
        {
            "linkId": "g-proc",
            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-Biopsy#Procedure",
            "text": "Procedure Biopsy group",
            "item": [
                {
                    "linkId": "type-of-biopsy",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-Biopsy#Procedure.category.coding",
                    "text": "Type of biopsy",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://snomed.info/sct",
                                "code": "27582007"
                            }
                        }
                    ]
                },
                {
                    "linkId": "procedure-status",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-Biopsy#Procedure.status",
                    "text": "Status",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://hl7.org/fhir/event-status",
                                "code": "completed"
                            }
                        }
                    ]
                },
                {
                    "linkId": "biopsy-date",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-Biopsy#Procedure.performedDateTime",
                    "text": "Date when the biopsy was performed",
                    "answer": [
                        {
                            "valueDateTime": "2000-02-10T10:00:00Z"
                        }
                    ]
                },
                {
                    "linkId": "biopsy",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-Biopsy#Procedure.code.coding",
                    "text": "Biopsy",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://snomed.info/sct",
                                "code": "86273004"
                            }
                        }
                    ]
                },
                {
                    "linkId": "biopsy-bodySite",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-Biopsy#Procedure.bodySite.coding",
                    "text": "Biopsy bodySite",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://snomed.info/sct",
                                "code": "41216001"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "linkId": "g-fam-hist",
            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateCancerFamilyHistory#FamilyMemberHistory",
            "text": "Family history group",
            "item": [
                {
                    "linkId": "family-history-pca",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateCancerFamilyHistory#FamilyMemberHistory.condition.code.coding",
                    "text": "Family history of prostate cancer",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://snomed.info/sct",
                                "code": "715412008"
                            }
                        }
                    ]
                },
                {
                    "linkId": "family-status",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateCancerFamilyHistory#FamilyMemberHistory.status",
                    "text": "Family Status",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://hl7.org/fhir/history-status",
                                "code": "completed"
                            }
                        }
                    ]
                },
                {
                    "linkId": "family-relationship",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateCancerFamilyHistory#FamilyMemberHistory.relationship.coding",
                    "text": "Family relationship",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
                                "code": "FAMMEMB"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "linkId": "g-obs-psa",
            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateSpecificAntigen#Observation",
            "text": "Observation PSA group",
            "item": [
                {
                    "linkId": "psa",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateSpecificAntigen#Observation.value",
                    "text": "Measure of prostate-specific antigen reported in ng/ml",
                    "answer": [
                        {
                            "valueQuantity": {
                                "value": 10,
                                "unit": "ng/ml"
                            }
                        }
                    ]
                },
                {
                    "linkId": "psa-code",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateSpecificAntigen#Observation.code.coding",
                    "text": "PSA code",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://loinc.org",
                                "code": "2857-1"
                            }
                        }
                    ]
                },
                {
                    "linkId": "psa-status",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateSpecificAntigen#Observation.status",
                    "text": "PSA Status",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://hl7.org/fhir/observation-status",
                                "code": "final"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "linkId": "g-proc-dre",
            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-DigitalRectalExamination#Procedure",
            "text": "Procedure DRE group",
            "item": [
                {
                    "linkId": "dre",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-DigitalRectalExamination#Procedure.outcome.coding",
                    "text": "Results of digital rectal examination",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://snomed.info/sct",
                                "code": "131196009"
                            }
                        }
                    ]
                },
                {
                    "linkId": "dre-code",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-DigitalRectalExamination#Procedure.code.coding",
                    "text": "DRE code",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://snomed.info/sct",
                                "code": "410006001"
                            }
                        }
                    ]
                },
                {
                    "linkId": "dre-status",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-DigitalRectalExamination#Procedure.status",
                    "text": "DRE Status",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://hl7.org/fhir/event-status",
                                "code": "completed"
                            }
                        }
                    ]
                },
                {
                    "linkId": "dre-bodySite",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-DigitalRectalExamination#Procedure.bodySite.coding",
                    "text": "DRE bodySite",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://snomed.info/sct",
                                "code": "41216001"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "linkId": "g-obs-prost-vol",
            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateVolume#Observation",
            "text": "Observation Prostate Volume group",
            "item": [
                {
                    "linkId": "prostate-volume",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateVolume#Observation.value",
                    "text": "Prostate volume in cc",
                    "answer": [
                        {
                            "valueQuantity": {
                                "value": 10,
                                "unit": "cc"
                            }
                        }
                    ]
                },
                {
                    "linkId": "prostate-code",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateVolume#Observation.code.coding",
                    "text": "Prostate volume code",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://snomed.info/sct",
                                "code": "1297142007"
                            }
                        }
                    ]
                },
                {
                    "linkId": "prostate-status",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateVolume#Observation.status",
                    "text": "Prostate volume Status",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://hl7.org/fhir/observation-status",
                                "code": "final"
                            }
                        }
                    ]
                },
                {
                    "linkId": "prostate-bodySite",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-ProstateVolume#Observation.bodySite.coding",
                    "text": "Prostate volume bodySite",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://snomed.info/sct",
                                "code": "41216001"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "linkId": "g-obs-pirads",
            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-PIRADSScore#Observation",
            "text": "Observation PI-RADS group",
            "item": [
                {
                    "linkId": "pirads",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-PIRADSScore#Observation.valueCodeableConcept.coding",
                    "text": "PI-RADS score",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://hl7.eu/fhir/ig/flute/CodeSystem/COS-PIRADSScore",
                                "code": "3"
                            }
                        }
                    ]
                },
                {
                    "linkId": "pirads-code",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-PIRADSScore#Observation.code.coding",
                    "text": "PI-RADS code",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://snomed.info/sct",
                                "code": "719178004"
                            }
                        }
                    ]
                },
                {
                    "linkId": "pirads-status",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/PR-PIRADSScore#Observation.status",
                    "text": "PI-RADS Status",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://hl7.org/fhir/observation-status",
                                "code": "final"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "linkId": "g-imag",
            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy",
            "text": "Imaging Study group",
            "item": [
                {
                    "linkId": "study-id-system",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.identifier.system",
                    "text": "Study ID System",
                    "answer": [
                        {
                            "valueUri": "urn:dicom:uid"
                        }
                    ]
                },
                {
                    "linkId": "study-id-value",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.identifier.value",
                    "text": "Study ID value",
                    "answer": [
                        {
                            "valueString": "ad1d247b-6e0a0a02-98880beb-460a2261-d25594b2"
                        }
                    ]
                },
                {
                    "linkId": "imagingstudy-status",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.status",
                    "text": "Study Status",
                    "answer": [
                        {
                            "valueCoding": {
                                "system": "http://hl7.org/fhir/imagingstudy-status",
                                "code": "available"
                            }
                        }
                    ]
                },
                {
                    "linkId": "imagingstudy-started",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.started",
                    "text": "Study Started DateTime",
                    "answer": [
                        {
                            "valueDateTime": "2000-02-10T10:00:00Z"
                        }
                    ]
                },
                {
                    "linkId": "imagingstudy-endpoint",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.endpoint.display",
                    "text": "Study DICOM URL Endpoint",
                    "answer": [
                        {
                            "valueString": "http://141.94.211.20:8042"
                        }
                    ]
                },
                {
                    "linkId": "g-imaging-series",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series",
                    "text": "Imaging Study Series group",
                    "item": [
                        {
                            "linkId": "imagingstudy-series-uid",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[+].uid",
                            "text": "Study Series UID",
                            "answer": [
                                {
                                    "valueString": "123"
                                }
                            ]
                        },
                        {
                            "linkId": "imagingstudy-series-modality",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[=].modality",
                            "text": "Study Series Modality",
                            "answer": [
                                {
                                    "valueCoding": {
                                        "system": "http://dicom.nema.org/resources/ontology/DCM",
                                        "code": "PA"
                                    }
                                }
                            ]
                        },
                        {
                            "linkId": "g-imaging-instance",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.instance",
                            "text": "Imaging Study Instance group",
                            "item": [
                                {
                                    "linkId": "imagingstudy-instance-uid",
                                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[=].instance[+].uid",
                                    "text": "Study instance UID",
                                    "answer": [
                                        {
                                            "valueString": "456"
                                        }
                                    ]
                                },
                                {
                                    "linkId": "imagingstudy-instance-class",
                                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[=].instance[=].sopClass",
                                    "text": "Study instance SOP Class",
                                    "answer": [
                                        {
                                            "valueCoding": {
                                                "system": "urn:ietf:rfc:3986",
                                                "code": "urn:oid:1.2.840.10008.5.1.4.1.1.4.4"
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "linkId": "g-imaging-instance",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.instance",
                            "text": "Imaging Study Instance group",
                            "item": [
                                {
                                    "linkId": "imagingstudy-instance-uid",
                                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[=].instance[+].uid",
                                    "text": "Study instance UID",
                                    "answer": [
                                        {
                                            "valueString": "789"
                                        }
                                    ]
                                },
                                {
                                    "linkId": "imagingstudy-instance-class",
                                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[=].instance[=].sopClass",
                                    "text": "Study instance SOP Class",
                                    "answer": [
                                        {
                                            "valueCoding": {
                                                "system": "urn:ietf:rfc:3986",
                                                "code": "urn:oid:1.2.840.10008.5.1.4.1.1.4.4"
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "linkId": "imagingstudy-note",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.note.text",
                    "text": "Any metadata relevant to filter the dataset before ML training"
                },
                {
                    "linkId": "g-imaging-series",
                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series",
                    "text": "Imaging Study Series group",
                    "item": [
                        {
                            "linkId": "imagingstudy-series-uid",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[+].uid",
                            "text": "Study Series UID",
                            "answer": [
                                {
                                    "valueString": "321"
                                }
                            ]
                        },
                        {
                            "linkId": "imagingstudy-series-modality",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[=].modality",
                            "text": "Study Series Modality",
                            "answer": [
                                {
                                    "valueCoding": {
                                        "system": "http://dicom.nema.org/resources/ontology/DCM",
                                        "code": "PA"
                                    }
                                }
                            ]
                        },
                        {
                            "linkId": "g-imaging-instance",
                            "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.instance",
                            "text": "Imaging Study Instance group",
                            "item": [
                                {
                                    "linkId": "imagingstudy-instance-uid",
                                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[=].instance[+].uid",
                                    "text": "Study instance UID",
                                    "answer": [
                                        {
                                            "valueString": "654"
                                        }
                                    ]
                                },
                                {
                                    "linkId": "imagingstudy-instance-class",
                                    "definition": "http://hl7.eu/fhir/ig/flute/StructureDefinition/imagingStudy-eu-flute#ImagingStudy.series[=].instance[=].sopClass",
                                    "text": "Study instance SOP Class",
                                    "answer": [
                                        {
                                            "valueCoding": {
                                                "system": "urn:ietf:rfc:3986",
                                                "code": "urn:oid:1.2.840.10008.5.1.4.1.1.4.4"
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    "author": {
        "identifier": {
            "value": "john.doe@gmail.com"
        }
    },
    "meta": {
        "lastUpdated": "2026-02-09T15:36:07Z",
        "versionId": "1"
    }
}

const questionnaire = (qr as any).contained?.[0];

const valueSetLoaderMock = {
  searchValueSet: async (url: string) => {
    const u = (url ?? "").toLowerCase();
    
    if (u.includes("vs-biopsytype")) {
      return [
        { system: "http://snomed.info/sct", code: "27582007", display: "Prostate biopsy" },
        { system: "http://snomed.info/sct", code: "86273004", display: "Biopsy" },
        { system: "http://snomed.info/sct", code: "274214007", display: "Needle biopsy" },
      ];
    }

    if (u.includes("vs-pca")) {
      return [
        { system: "http://snomed.info/sct", code: "715412008", display: "Prostate cancer (disorder)" },
        { system: "http://snomed.info/sct", code: "399068003", display: "Family history of malignant neoplasm of prostate" },
        { system: "http://snomed.info/sct", code: "260385009", display: "Negative" },
      ];
    }

    if (u.includes("vs-dreoutcomecode")) {
      return [
        { system: "http://snomed.info/sct", code: "131196009", display: "Abnormal digital rectal examination" },
        { system: "http://snomed.info/sct", code: "17621005", display: "Normal" },
        { system: "http://snomed.info/sct", code: "260385009", display: "Negative" },
      ];
    }

    if (u.includes("dicom.nema.org") && u.includes("cid_29")) {
      return [
        { system: "http://dicom.nema.org/resources/ontology/DCM", code: "PA", display: "Photoacoustic" },
        { system: "http://dicom.nema.org/resources/ontology/DCM", code: "MR", display: "Magnetic Resonance" },
        { system: "http://dicom.nema.org/resources/ontology/DCM", code: "CT", display: "Computed Tomography" },
        { system: "http://dicom.nema.org/resources/ontology/DCM", code: "US", display: "Ultrasound" },
        { system: "http://dicom.nema.org/resources/ontology/DCM", code: "CR", display: "Computed Radiography" },
        { system: "http://dicom.nema.org/resources/ontology/DCM", code: "DX", display: "Digital Radiography" },
      ];
    }

    if (u.includes("vs-sopclass")) {
      return [
        {
          system: "urn:ietf:rfc:3986",
          code: "urn:oid:1.2.840.10008.5.1.4.1.1.4.4",
          display: "MR Spectroscopy Storage",
        },
        {
          system: "urn:ietf:rfc:3986",
          code: "urn:oid:1.2.840.10008.5.1.4.1.1.2",
          display: "CT Image Storage",
        },
        {
          system: "urn:ietf:rfc:3986",
          code: "urn:oid:1.2.840.10008.5.1.4.1.1.4",
          display: "MR Image Storage",
        },
      ];
    }

    return [];
  },
  toCodeableConcept: (coding: any) => ({ coding: [coding] }),
} as any;


export const Default: StoryObj<QuestionnaireDisplayProps> = {
    ...Template,
    args: {
        questionnaire,
        questionnaireResponse: qr as any,
        valueSetLoader: valueSetLoaderMock,
        onSubmit: (response) => console.log("Submitted response:", JSON.stringify(response, null, 2)),
    },
};

export const ReadOnly: StoryObj<QuestionnaireDisplayProps> = {
    ...Template,
    args: {
        questionnaire,
        questionnaireResponse: qr as any,
        valueSetLoader: valueSetLoaderMock,
        readOnly: true,
        onSubmit: (response) => console.log("Submitted response:", JSON.stringify(response, null, 2)),
    },
};

export const WithCustomLabels: StoryObj<QuestionnaireDisplayProps> = {
    ...Template,
    args: {
        questionnaire,
        questionnaireResponse: qr as any,
        valueSetLoader: valueSetLoaderMock,
        submitButtonLabel: "Enregistrer",
        resetButtonLabel: "Réinitialiser",
        onSubmit: (response) => console.log("Submitted response:", JSON.stringify(response, null, 2)),
    },
};
const qrChru = {
    "resourceType": "QuestionnaireResponse",
    "id": "Questionnaire-UpCare-UCA-MATERNITE",
    "contained": [
        {
            "resourceType": "Questionnaire",
            "id": "Questionnaire-UpCare",
            "meta": {},
            "language": "fr-FR",
            "text": {
                "status": "extensions",
                "div": "<div xml:lang=\"fr-FR\" xmlns=\"http://www.w3.org/1999/xhtml\" lang=\"fr-FR\"><p class=\"res-header-id\"><b>Narratif généré : Questionnaire Questionnaire-UpCare</b></p><a name=\"Questionnaire-UpCare\"> </a><a name=\"hcQuestionnaire-UpCare\"> </a><div style=\"display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%\"><p style=\"margin-bottom: 0px\">Langue : fr-FR</p></div><b>Structure</b><table border=\"1\" cellpadding=\"0\" cellspacing=\"0\" style=\"border: 1px #F0F0F0 solid; font-size: 11px; font-family: verdana; vertical-align: top;\"><tr style=\"border: 2px #F0F0F0 solid; font-size: 11px; font-family: verdana; vertical-align: top\"><th style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px; padding-top: 3px; padding-bottom: 3px\" class=\"hierarchy\"><a href=\"https://hl7.org/fhir/R4/formats.html#table\" title=\"Le linkID de l'élément\">LinkID</a></th><th style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px; padding-top: 3px; padding-bottom: 3px\" class=\"hierarchy\"><a href=\"https://hl7.org/fhir/R4/formats.html#table\" title=\"Texte de l'élément\">Texte</a></th><th style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px; padding-top: 3px; padding-bottom: 3px\" class=\"hierarchy\"><a href=\"https://hl7.org/fhir/R4/formats.html#table\" title=\"Nombre minimum et maximum de fois que l'élément peut apparaître dans l'instance\">Cardinalité</a></th><th style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px; padding-top: 3px; padding-bottom: 3px\" class=\"hierarchy\"><a href=\"https://hl7.org/fhir/R4/formats.html#table\" title=\"Le type de l'élément\">Type</a></th><th style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px; padding-top: 3px; padding-bottom: 3px\" class=\"hierarchy\"><a href=\"https://hl7.org/fhir/R4/formats.html#table\" title=\"Autres attributs de l'élément\">Drapeaux</a></th><th style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px; padding-top: 3px; padding-bottom: 3px\" class=\"hierarchy\"><a href=\"https://hl7.org/fhir/R4/formats.html#table\" title=\"Informations supplémentaires sur l'élément\">Description et contraintes</a><span style=\"float: right\"><a href=\"https://hl7.org/fhir/R4/formats.html#table\" title=\"Legend for this format\"><img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3goXBCwdPqAP0wAAAldJREFUOMuNk0tIlFEYhp9z/vE2jHkhxXA0zJCMitrUQlq4lnSltEqCFhFG2MJFhIvIFpkEWaTQqjaWZRkp0g26URZkTpbaaOJkDqk10szoODP//7XIMUe0elcfnPd9zsfLOYplGrpRwZaqTtw3K7PtGem7Q6FoidbGgqHVy/HRb669R+56zx7eRV1L31JGxYbBtjKK93cxeqfyQHbehkZbUkK20goELEuIzEd+dHS+qz/Y8PTSif0FnGkbiwcAjHaU1+QWOptFiyCLp/LnKptpqIuXHx6rbR26kJcBX3yLgBfnd7CxwJmflpP2wUg0HIAoUUpZBmKzELGWcN8nAr6Gpu7tLU/CkwAaoKTWRSQyt89Q8w6J+oVQkKnBoblH7V0PPvUOvDYXfopE/SJmALsxnVm6LbkotrUtNowMeIrVrBcBpaMmdS0j9df7abpSuy7HWehwJdt1lhVwi/J58U5beXGAF6c3UXLycw1wdFklArBn87xdh0ZsZtArghBdAA3+OEDVubG4UEzP6x1FOWneHh2VDAHBAt80IbdXDcesNoCvs3E5AFyNSU5nbrDPZpcUEQQTFZiEVx+51fxMhhyJEAgvlriadIJZZksRuwBYMOPBbO3hePVVqgEJhFeUuFLhIPkRP6BQLIBrmMenujm/3g4zc398awIe90Zb5A1vREALqneMcYgP/xVQWlG+Ncu5vgwwlaUNx+3799rfe96u9K0JSDXcOzOTJg4B6IgmXfsygc7/Bvg9g9E58/cDVmGIBOP/zT8Bz1zqWqpbXIsd0O9hajXfL6u4BaOS6SeWAAAAAElFTkSuQmCC\" alt=\"doco\" style=\"background-color: inherit\"/></a></span></th></tr><tr style=\"border: 1px #F0F0F0 solid; padding:0px; vertical-align: top; background-color: white\"><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px; white-space: nowrap; background-image: url(tbl_bck1.png)\" class=\"hierarchy\"><img src=\"tbl_spacer.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"icon_q_root.gif\" alt=\".\" style=\"background-color: white; background-color: inherit\" title=\"QuestionnaireRoot\" class=\"hierarchy\"/> QuestionnaireUpCare</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">Questionnaire de satisfaction du projet Up Care.</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"/><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">Questionnaire</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"/><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">http://chun.upcare.fr/fhir/Questionnaire/Questionnaire-UpCare#0.1.0</td></tr>\r\n<tr style=\"border: 1px #F0F0F0 solid; padding:0px; vertical-align: top; background-color: #F7F7F7\"><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px; white-space: nowrap; background-image: url(tbl_bck10.png)\" id=\"item.2344e4b2-f5eb-4f54-88fa-51686a47f261\" class=\"hierarchy\"><img src=\"tbl_spacer.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_vjoin.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"icon-q-display.png\" alt=\".\" style=\"background-color: #F7F7F7; background-color: inherit\" title=\"display\" class=\"hierarchy\"/> 2344e4b2-f5eb-4f54-88fa-51686a47f261</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">Ce questionnaire aborde différents aspects de votre vie il vous est demandé d’évaluer votre satisfaction. Il se compose d’une série d’énoncés pour lesquels vous devez indiquer votre position sur une échelle de satisfaction composée de 6 modalités « pas du tout satisfait » à « tout à fait satisfait »\nSoyez spontané et sincère dans vos réponses.\nCe questionnaire est anonyme, confidentiel et aucune réponse individuelle ne sera communiquée.</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">0..1</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"><a href=\"https://hl7.org/fhir/R4/codesystem-item-type.html#item-type-display\">display</a></td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"/><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"/></tr>\r\n<tr style=\"border: 1px #F0F0F0 solid; padding:0px; vertical-align: top; background-color: white\"><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px; white-space: nowrap; background-image: url(tbl_bck11.png)\" id=\"item.05e5342c-4745-46e5-898b-9de7f6345085\" class=\"hierarchy\"><img src=\"tbl_spacer.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_vjoin.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"icon-q-group.png\" alt=\".\" style=\"background-color: white; background-color: inherit\" title=\"group\" class=\"hierarchy\"/> 05e5342c-4745-46e5-898b-9de7f6345085</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">Informations générales</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">1..1</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"><a href=\"https://hl7.org/fhir/R4/codesystem-item-type.html#item-type-group\">group</a></td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"/><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"/></tr>\r\n<tr style=\"border: 1px #F0F0F0 solid; padding:0px; vertical-align: top; background-color: #F7F7F7\"><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px; white-space: nowrap; background-image: url(tbl_bck110.png)\" id=\"item.aee11f5c-d4fa-4e78-8fe7-9a23ef692434\" class=\"hierarchy\"><img src=\"tbl_spacer.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_vline.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_vjoin.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"icon-q-coding.png\" alt=\".\" style=\"background-color: #F7F7F7; background-color: inherit\" title=\"coding\" class=\"hierarchy\"/> aee11f5c-d4fa-4e78-8fe7-9a23ef692434</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">Vous êtes</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">1..1</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"><a href=\"https://hl7.org/fhir/R4/codesystem-item-type.html#item-type-choice\">choice</a></td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"/><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">Options : <a href=\"#opt-item.aee11f5c-d4fa-4e78-8fe7-9a23ef692434\">2 options</a></td></tr>\r\n<tr style=\"border: 1px #F0F0F0 solid; padding:0px; vertical-align: top; background-color: white\"><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px; white-space: nowrap; background-image: url(tbl_bck110.png)\" id=\"item.87d0898a-eb83-43bc-83e0-3705536413b2\" class=\"hierarchy\"><img src=\"tbl_spacer.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_vline.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_vjoin.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"icon-q-integer.png\" alt=\".\" style=\"background-color: white; background-color: inherit\" title=\"integer\" class=\"hierarchy\"/> 87d0898a-eb83-43bc-83e0-3705536413b2</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">Votre âge</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">1..1</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"><a href=\"https://hl7.org/fhir/R4/codesystem-item-type.html#item-type-integer\">integer</a></td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"/><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"/></tr>\r\n<tr style=\"border: 1px #F0F0F0 solid; padding:0px; vertical-align: top; background-color: #F7F7F7\"><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px; white-space: nowrap; background-image: url(tbl_bck110.png)\" id=\"item.7b1d0342-56d9-4011-ac62-e9466bb0e872\" class=\"hierarchy\"><img src=\"tbl_spacer.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_vline.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_vjoin.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"icon-q-date.png\" alt=\".\" style=\"background-color: #F7F7F7; background-color: inherit\" title=\"date\" class=\"hierarchy\"/> 7b1d0342-56d9-4011-ac62-e9466bb0e872</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">Votre date d'arrivée dans le service</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">1..1</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"><a href=\"https://hl7.org/fhir/R4/codesystem-item-type.html#item-type-date\">date</a></td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"/><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"/></tr>\r\n<tr style=\"border: 1px #F0F0F0 solid; padding:0px; vertical-align: top; background-color: white\"><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px; white-space: nowrap; background-image: url(tbl_bck100.png)\" id=\"item.c4a48ada-a01a-4d39-a067-ea3e99d5035c\" class=\"hierarchy\"><img src=\"tbl_spacer.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_vline.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_vjoin_end.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"icon-q-coding.png\" alt=\".\" style=\"background-color: white; background-color: inherit\" title=\"coding\" class=\"hierarchy\"/> c4a48ada-a01a-4d39-a067-ea3e99d5035c</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">Votre fonction</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">1..1</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"><a href=\"https://hl7.org/fhir/R4/codesystem-item-type.html#item-type-choice\">choice</a></td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"/><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">Options : <a href=\"#opt-item.c4a48ada-a01a-4d39-a067-ea3e99d5035c\">3 options</a></td></tr>\r\n<tr style=\"border: 1px #F0F0F0 solid; padding:0px; vertical-align: top; background-color: #F7F7F7\"><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px; white-space: nowrap; background-image: url(tbl_bck11.png)\" id=\"item.de1f4934-cc25-4fd3-9e92-15057c488379\" class=\"hierarchy\"><img src=\"tbl_spacer.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_vjoin.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"icon-q-group.png\" alt=\".\" style=\"background-color: #F7F7F7; background-color: inherit\" title=\"group\" class=\"hierarchy\"/> de1f4934-cc25-4fd3-9e92-15057c488379</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">Questionnaire</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">1..1</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"><a href=\"https://hl7.org/fhir/R4/codesystem-item-type.html#item-type-group\">group</a></td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"/><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"/></tr>\r\n<tr style=\"border: 1px #F0F0F0 solid; padding:0px; vertical-align: top; background-color: white\"><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px; white-space: nowrap; background-image: url(tbl_bck111.png)\" id=\"item.429b294f-66f8-4d5a-d42d-b9955d1d9b66\" class=\"hierarchy\"><img src=\"tbl_spacer.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_vline.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_vjoin.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"icon-q-group.png\" alt=\".\" style=\"background-color: white; background-color: inherit\" title=\"group\" class=\"hierarchy\"/> 429b294f-66f8-4d5a-d42d-b9955d1d9b66</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">A. Organisation et contenu du travail</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">1..1</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"><a href=\"https://hl7.org/fhir/R4/codesystem-item-type.html#item-type-group\">group</a></td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"/><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"/></tr>\r\n<tr style=\"border: 1px #F0F0F0 solid; padding:0px; vertical-align: top; background-color: #F7F7F7\"><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px; white-space: nowrap; background-image: url(tbl_bck1100.png)\" id=\"item.59a247f8-578f-4c31-8f7c-8d08b0b552fb\" class=\"hierarchy\"><img src=\"tbl_spacer.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_vline.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_vline.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_vjoin_end.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"icon-q-coding.png\" alt=\".\" style=\"background-color: #F7F7F7; background-color: inherit\" title=\"coding\" class=\"hierarchy\"/> 59a247f8-578f-4c31-8f7c-8d08b0b552fb</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">La manière dont le travail est organisé dans mon service</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">1..1</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"><a href=\"https://hl7.org/fhir/R4/codesystem-item-type.html#item-type-choice\">choice</a></td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"/><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">Options : <a href=\"#opt-item.59a247f8-578f-4c31-8f7c-8d08b0b552fb\">6 options</a></td></tr>\r\n<tr style=\"border: 1px #F0F0F0 solid; padding:0px; vertical-align: top; background-color: white\"><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px; white-space: nowrap; background-image: url(tbl_bck101.png)\" id=\"item.75c01161-9998-4212-82d0-58889ad89829\" class=\"hierarchy\"><img src=\"tbl_spacer.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_vline.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_vjoin_end.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"icon-q-group.png\" alt=\".\" style=\"background-color: white; background-color: inherit\" title=\"group\" class=\"hierarchy\"/> 75c01161-9998-4212-82d0-58889ad89829</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">B. Relation entre personnel</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">1..1</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"><a href=\"https://hl7.org/fhir/R4/codesystem-item-type.html#item-type-group\">group</a></td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"/><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"/></tr>\r\n<tr style=\"border: 1px #F0F0F0 solid; padding:0px; vertical-align: top; background-color: #F7F7F7\"><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px; white-space: nowrap; background-image: url(tbl_bck1000.png)\" id=\"item.bfdc7394-7de1-4052-8652-de260795dc46\" class=\"hierarchy\"><img src=\"tbl_spacer.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_vline.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_blank.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_vjoin_end.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"icon-q-coding.png\" alt=\".\" style=\"background-color: #F7F7F7; background-color: inherit\" title=\"coding\" class=\"hierarchy\"/> bfdc7394-7de1-4052-8652-de260795dc46</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">Les relations humaines entre professionnels dans le service</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">1..1</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"><a href=\"https://hl7.org/fhir/R4/codesystem-item-type.html#item-type-choice\">choice</a></td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"/><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">Options : <a href=\"#opt-item.bfdc7394-7de1-4052-8652-de260795dc46\">6 options</a></td></tr>\r\n<tr style=\"border: 1px #F0F0F0 solid; padding:0px; vertical-align: top; background-color: white\"><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px; white-space: nowrap; background-image: url(tbl_bck01.png)\" id=\"item.resultats-observation\" class=\"hierarchy\"><img src=\"tbl_spacer.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_vjoin_end.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"icon-q-group.png\" alt=\".\" style=\"background-color: white; background-color: inherit\" title=\"group\" class=\"hierarchy\"/> resultats-observation</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">Résultats calculés</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">0..1</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"><a href=\"https://hl7.org/fhir/R4/codesystem-item-type.html#item-type-group\">group</a></td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"><a href=\"https://hl7.org/fhir/R4/questionnaire-definitions.html#Questionnaire.item.readOnly\" title=\"Est en lecture seule\"><img src=\"icon-qi-readonly.png\" alt=\"icon\"/></a><img src=\"icon-qi-readonly.png\" alt=\"icon\"/></td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">Definition : <a href=\"http://hl7.org/fhir/R4/observation.html#Observation\">Observation</a></td></tr>\r\n<tr style=\"border: 1px #F0F0F0 solid; padding:0px; vertical-align: top; background-color: #F7F7F7\"><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px; white-space: nowrap; background-image: url(tbl_bck010.png)\" id=\"item.score_moyen\" class=\"hierarchy\"><img src=\"tbl_spacer.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_blank.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_vjoin.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"icon-q-decimal.png\" alt=\".\" style=\"background-color: #F7F7F7; background-color: inherit\" title=\"decimal\" class=\"hierarchy\"/> score_moyen</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">Score moyen de satisfaction</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">0..1</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"><a href=\"https://hl7.org/fhir/R4/codesystem-item-type.html#item-type-decimal\">decimal</a></td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"><a href=\"https://hl7.org/fhir/R4/questionnaire-definitions.html#Questionnaire.item.readOnly\" title=\"Est en lecture seule\"><img src=\"icon-qi-readonly.png\" alt=\"icon\"/></a><img src=\"icon-qi-readonly.png\" alt=\"icon\"/></td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">Definition : <a href=\"http://hl7.org/fhir/R4/observation.html#Observation.valueQuantity.value\">Observation.valueQuantity.value</a></td></tr>\r\n<tr style=\"border: 1px #F0F0F0 solid; padding:0px; vertical-align: top; background-color: white\"><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px; white-space: nowrap; background-image: url(tbl_bck010.png)\" id=\"item.obs_status\" class=\"hierarchy\"><img src=\"tbl_spacer.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_blank.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_vjoin.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"icon-q-coding.png\" alt=\".\" style=\"background-color: white; background-color: inherit\" title=\"coding\" class=\"hierarchy\"/> obs_status</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">Statut de l'observation</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">0..1</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"><a href=\"https://hl7.org/fhir/R4/codesystem-item-type.html#item-type-choice\">choice</a></td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"><a href=\"https://hl7.org/fhir/R4/questionnaire-definitions.html#Questionnaire.item.readOnly\" title=\"Est en lecture seule\"><img src=\"icon-qi-readonly.png\" alt=\"icon\"/></a><img src=\"icon-qi-readonly.png\" alt=\"icon\"/></td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: white; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">Definition : <a href=\"http://hl7.org/fhir/R4/observation.html#Observation.status\">Observation.status</a><br/>Options : <a href=\"#opt-item.obs_status\">1 option</a></td></tr>\r\n<tr style=\"border: 1px #F0F0F0 solid; padding:0px; vertical-align: top; background-color: #F7F7F7\"><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px; white-space: nowrap; background-image: url(tbl_bck000.png)\" id=\"item.obs_code\" class=\"hierarchy\"><img src=\"tbl_spacer.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_blank.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"tbl_vjoin_end.png\" alt=\".\" style=\"background-color: inherit\" class=\"hierarchy\"/><img src=\"icon-q-coding.png\" alt=\".\" style=\"background-color: #F7F7F7; background-color: inherit\" title=\"coding\" class=\"hierarchy\"/> obs_code</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">Code de l'observation</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">0..1</td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"><a href=\"https://hl7.org/fhir/R4/codesystem-item-type.html#item-type-choice\">choice</a></td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\"><a href=\"https://hl7.org/fhir/R4/questionnaire-definitions.html#Questionnaire.item.readOnly\" title=\"Est en lecture seule\"><img src=\"icon-qi-readonly.png\" alt=\"icon\"/></a><img src=\"icon-qi-readonly.png\" alt=\"icon\"/></td><td style=\"vertical-align: top; text-align : var(--ig-left,left); background-color: #F7F7F7; border: 1px #F0F0F0 solid; padding:0px 4px 0px 4px\" class=\"hierarchy\">Definition : <a href=\"http://hl7.org/fhir/R4/observation.html#Observation.code\">Observation.code</a><br/>Options : <a href=\"#opt-item.obs_code\">1 option</a></td></tr>\r\n<tr><td colspan=\"6\" class=\"hierarchy\"><br/><a href=\"https://hl7.org/fhir/R4/formats.html#table\" title=\"Légende pour ce format\"><img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3goXBCwdPqAP0wAAAldJREFUOMuNk0tIlFEYhp9z/vE2jHkhxXA0zJCMitrUQlq4lnSltEqCFhFG2MJFhIvIFpkEWaTQqjaWZRkp0g26URZkTpbaaOJkDqk10szoODP//7XIMUe0elcfnPd9zsfLOYplGrpRwZaqTtw3K7PtGem7Q6FoidbGgqHVy/HRb669R+56zx7eRV1L31JGxYbBtjKK93cxeqfyQHbehkZbUkK20goELEuIzEd+dHS+qz/Y8PTSif0FnGkbiwcAjHaU1+QWOptFiyCLp/LnKptpqIuXHx6rbR26kJcBX3yLgBfnd7CxwJmflpP2wUg0HIAoUUpZBmKzELGWcN8nAr6Gpu7tLU/CkwAaoKTWRSQyt89Q8w6J+oVQkKnBoblH7V0PPvUOvDYXfopE/SJmALsxnVm6LbkotrUtNowMeIrVrBcBpaMmdS0j9df7abpSuy7HWehwJdt1lhVwi/J58U5beXGAF6c3UXLycw1wdFklArBn87xdh0ZsZtArghBdAA3+OEDVubG4UEzP6x1FOWneHh2VDAHBAt80IbdXDcesNoCvs3E5AFyNSU5nbrDPZpcUEQQTFZiEVx+51fxMhhyJEAgvlriadIJZZksRuwBYMOPBbO3hePVVqgEJhFeUuFLhIPkRP6BQLIBrmMenujm/3g4zc398awIe90Zb5A1vREALqneMcYgP/xVQWlG+Ncu5vgwwlaUNx+3799rfe96u9K0JSDXcOzOTJg4B6IgmXfsygc7/Bvg9g9E58/cDVmGIBOP/zT8Bz1zqWqpbXIsd0O9hajXfL6u4BaOS6SeWAAAAAElFTkSuQmCC\" alt=\"doco\" style=\"background-color: inherit\"/> Documentation pour ce format</a></td></tr></table><hr/><p><b>Ensembles d'options</b></p><a name=\"opt-item.aee11f5c-d4fa-4e78-8fe7-9a23ef692434\"> </a><p><b>Options de réponse pour aee11f5c-d4fa-4e78-8fe7-9a23ef692434 </b></p><ul><li style=\"font-size: 11px\">Une femme</li><li style=\"font-size: 11px\">Un homme</li></ul><a name=\"opt-item.c4a48ada-a01a-4d39-a067-ea3e99d5035c\"> </a><p><b>Options de réponse pour c4a48ada-a01a-4d39-a067-ea3e99d5035c </b></p><ul><li style=\"font-size: 11px\">ASH</li><li style=\"font-size: 11px\">AS</li><li style=\"font-size: 11px\">IDE</li></ul><a name=\"opt-item.59a247f8-578f-4c31-8f7c-8d08b0b552fb\"> </a><p><b>Options de réponse pour 59a247f8-578f-4c31-8f7c-8d08b0b552fb </b></p><ul><li style=\"font-size: 11px\">http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs#0 (&quot;Pas du tout satisfait&quot;)</li><li style=\"font-size: 11px\">http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs#1 (&quot;Pas satisfait&quot;)</li><li style=\"font-size: 11px\">http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs#2 (&quot;Assez peu satisfait&quot;)</li><li style=\"font-size: 11px\">http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs#3 (&quot;Assez satisfait&quot;)</li><li style=\"font-size: 11px\">http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs#4 (&quot;Satisfait&quot;)</li><li style=\"font-size: 11px\">http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs#5 (&quot;Tout à fait satisfait&quot;)</li></ul><a name=\"opt-item.bfdc7394-7de1-4052-8652-de260795dc46\"> </a><p><b>Options de réponse pour bfdc7394-7de1-4052-8652-de260795dc46 </b></p><ul><li style=\"font-size: 11px\">http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs#0 (&quot;Pas du tout satisfait&quot;)</li><li style=\"font-size: 11px\">http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs#1 (&quot;Pas satisfait&quot;)</li><li style=\"font-size: 11px\">http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs#2 (&quot;Assez peu satisfait&quot;)</li><li style=\"font-size: 11px\">http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs#3 (&quot;Assez satisfait&quot;)</li><li style=\"font-size: 11px\">http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs#4 (&quot;Satisfait&quot;)</li><li style=\"font-size: 11px\">http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs#5 (&quot;Tout à fait satisfait&quot;)</li></ul><a name=\"opt-item.obs_status\"> </a><p><b>Options de réponse pour obs_status </b></p><ul><li style=\"font-size: 11px\">http://hl7.org/fhir/observation-status#final (&quot;Final&quot;)</li></ul><a name=\"opt-item.obs_code\"> </a><p><b>Options de réponse pour obs_code </b></p><ul><li style=\"font-size: 11px\">http://chun.upcare.fr/fhir/CodeSystem/upcare-observation-cs#score-moyen-satisfaction (&quot;Score moyen de satisfaction&quot;)</li></ul></div>"
            },
            "url": "http://chun.upcare.fr/fhir/Questionnaire/Questionnaire-UpCare",
            "version": "0.1.0",
            "name": "QuestionnaireUpCare",
            "title": "CHRU Questionnaire de Satisfaction projet Up Care",
            "status": "draft",
            "subjectType": [
                "Patient"
            ],
            "date": "2026-06-19T14:45:49+02:00",
            "publisher": "CHUN",
            "contact": [
                {
                    "name": "CHUN",
                    "telecom": [
                        {
                            "system": "url",
                            "value": "http://chun.upcare.fr"
                        }
                    ]
                }
            ],
            "description": "Questionnaire de satisfaction du projet Up Care.",
            "item": [
                {
                    "linkId": "2344e4b2-f5eb-4f54-88fa-51686a47f261",
                    "text": "Ce questionnaire aborde différents aspects de votre vie il vous est demandé d’évaluer votre satisfaction. Il se compose d’une série d’énoncés pour lesquels vous devez indiquer votre position sur une échelle de satisfaction composée de 6 modalités « pas du tout satisfait » à « tout à fait satisfait »\nSoyez spontané et sincère dans vos réponses.\nCe questionnaire est anonyme, confidentiel et aucune réponse individuelle ne sera communiquée.",
                    "type": "display"
                },
                {
                    "linkId": "05e5342c-4745-46e5-898b-9de7f6345085",
                    "text": "Informations générales",
                    "type": "group",
                    "required": true,
                    "item": [
                        {
                            "extension": [
                                {
                                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                                    "valueCodeableConcept": {
                                        "coding": [
                                            {
                                                "system": "http://hl7.org/fhir/questionnaire-item-control",
                                                "code": "radio-button"
                                            }
                                        ]
                                    }
                                }
                            ],
                            "linkId": "aee11f5c-d4fa-4e78-8fe7-9a23ef692434",
                            "text": "Vous êtes",
                            "type": "choice",
                            "required": true,
                            "answerOption": [
                                {
                                    "valueString": "Une femme"
                                },
                                {
                                    "valueString": "Un homme"
                                }
                            ]
                        },
                        {
                            "extension": [
                                {
                                    "url": "http://hl7.org/fhir/StructureDefinition/minValue",
                                    "valueInteger": 0
                                },
                                {
                                    "url": "http://hl7.org/fhir/StructureDefinition/maxValue",
                                    "valueInteger": 120
                                }
                            ],
                            "linkId": "87d0898a-eb83-43bc-83e0-3705536413b2",
                            "text": "Votre âge",
                            "type": "integer",
                            "required": true
                        },
                        {
                            "linkId": "7b1d0342-56d9-4011-ac62-e9466bb0e872",
                            "text": "Votre date d'arrivée dans le service",
                            "type": "date",
                            "required": true
                        },
                        {
                            "extension": [
                                {
                                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                                    "valueCodeableConcept": {
                                        "coding": [
                                            {
                                                "system": "http://hl7.org/fhir/questionnaire-item-control",
                                                "code": "drop-down"
                                            }
                                        ]
                                    }
                                }
                            ],
                            "linkId": "c4a48ada-a01a-4d39-a067-ea3e99d5035c",
                            "text": "Votre fonction",
                            "type": "choice",
                            "required": true,
                            "answerOption": [
                                {
                                    "valueString": "ASH"
                                },
                                {
                                    "valueString": "AS"
                                },
                                {
                                    "valueString": "IDE"
                                }
                            ]
                        }
                    ]
                },
                {
                    "linkId": "de1f4934-cc25-4fd3-9e92-15057c488379",
                    "text": "Questionnaire",
                    "type": "group",
                    "required": true,
                    "item": [
                        {
                            "linkId": "429b294f-66f8-4d5a-d42d-b9955d1d9b66",
                            "text": "A. Organisation et contenu du travail",
                            "type": "group",
                            "required": true,
                            "item": [
                                {
                                    "extension": [
                                        {
                                            "url": "http://hl7.org/fhir/StructureDefinition/variable",
                                            "valueExpression": {
                                                "name": "qA",
                                                "language": "text/fhirpath",
                                                "expression": "%resource.repeat(item).where(linkId='59a247f8-578f-4c31-8f7c-8d08b0b552fb').answer.valueCoding.code"
                                            }
                                        }
                                    ],
                                    "linkId": "59a247f8-578f-4c31-8f7c-8d08b0b552fb",
                                    "text": "La manière dont le travail est organisé dans mon service",
                                    "type": "choice",
                                    "required": true,
                                    "answerOption": [
                                        {
                                            "valueCoding": {
                                                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                                                "code": "0",
                                                "display": "Pas du tout satisfait"
                                            }
                                        },
                                        {
                                            "valueCoding": {
                                                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                                                "code": "1",
                                                "display": "Pas satisfait"
                                            }
                                        },
                                        {
                                            "valueCoding": {
                                                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                                                "code": "2",
                                                "display": "Assez peu satisfait"
                                            }
                                        },
                                        {
                                            "valueCoding": {
                                                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                                                "code": "3",
                                                "display": "Assez satisfait"
                                            }
                                        },
                                        {
                                            "valueCoding": {
                                                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                                                "code": "4",
                                                "display": "Satisfait"
                                            }
                                        },
                                        {
                                            "valueCoding": {
                                                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                                                "code": "5",
                                                "display": "Tout à fait satisfait"
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "linkId": "75c01161-9998-4212-82d0-58889ad89829",
                            "text": "B. Relation entre personnel",
                            "type": "group",
                            "required": true,
                            "item": [
                                {
                                    "extension": [
                                        {
                                            "url": "http://hl7.org/fhir/StructureDefinition/variable",
                                            "valueExpression": {
                                                "name": "qB",
                                                "language": "text/fhirpath",
                                                "expression": "%resource.repeat(item).where(linkId='bfdc7394-7de1-4052-8652-de260795dc46').answer.valueCoding.code"
                                            }
                                        }
                                    ],
                                    "linkId": "bfdc7394-7de1-4052-8652-de260795dc46",
                                    "text": "Les relations humaines entre professionnels dans le service",
                                    "type": "choice",
                                    "required": true,
                                    "answerOption": [
                                        {
                                            "valueCoding": {
                                                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                                                "code": "0",
                                                "display": "Pas du tout satisfait"
                                            }
                                        },
                                        {
                                            "valueCoding": {
                                                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                                                "code": "1",
                                                "display": "Pas satisfait"
                                            }
                                        },
                                        {
                                            "valueCoding": {
                                                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                                                "code": "2",
                                                "display": "Assez peu satisfait"
                                            }
                                        },
                                        {
                                            "valueCoding": {
                                                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                                                "code": "3",
                                                "display": "Assez satisfait"
                                            }
                                        },
                                        {
                                            "valueCoding": {
                                                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                                                "code": "4",
                                                "display": "Satisfait"
                                            }
                                        },
                                        {
                                            "valueCoding": {
                                                "system": "http://chun.upcare.fr/fhir/CodeSystem/score-satisfaction-cs",
                                                "code": "5",
                                                "display": "Tout à fait satisfait"
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "extension": [
                        {
                            "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-definitionExtractValue",
                            "extension": [
                                {
                                    "url": "definition",
                                    "valueUri": "http://hl7.org/fhir/StructureDefinition/Observation#Observation.effective"
                                },
                                {
                                    "url": "expression",
                                    "valueExpression": {
                                        "language": "text/fhirpath",
                                        "expression": "(%resource.authored | %resource.meta.lastUpdated | now()).first()"
                                    }
                                }
                            ]
                        },
                        {
                            "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-definitionExtractValue",
                            "extension": [
                                {
                                    "url": "definition",
                                    "valueUri": "http://hl7.org/fhir/StructureDefinition/Observation#Observation.focus"
                                },
                                {
                                    "url": "expression",
                                    "valueExpression": {
                                        "language": "text/fhirpath",
                                        "expression": "%resource.subject"
                                    }
                                }
                            ]
                        }
                    ],
                    "linkId": "resultats-observation",
                    "definition": "http://hl7.org/fhir/StructureDefinition/Observation#Observation",
                    "text": "Résultats calculés",
                    "type": "group",
                    "readOnly": true,
                    "item": [
                        {
                            "extension": [
                                {
                                    "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression",
                                    "valueExpression": {
                                        "language": "text/fhirpath",
                                        "expression": "(%qA.first().toDecimal() | %qB.first().toDecimal()).avg()"
                                    }
                                }
                            ],
                            "linkId": "score_moyen",
                            "definition": "http://hl7.org/fhir/StructureDefinition/Observation#Observation.valueQuantity.value",
                            "code": [
                                {
                                    "system": "http://chun.upcare.fr/fhir/CodeSystem/upcare-observation-cs",
                                    "code": "score-moyen-satisfaction",
                                    "display": "Score moyen de satisfaction"
                                }
                            ],
                            "text": "Score moyen de satisfaction",
                            "type": "decimal",
                            "readOnly": true
                        },
                        {
                            "linkId": "obs_status",
                            "definition": "http://hl7.org/fhir/StructureDefinition/Observation#Observation.status",
                            "text": "Statut de l'observation",
                            "type": "choice",
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://hl7.org/fhir/observation-status",
                                        "code": "final",
                                        "display": "Final"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        },
                        {
                            "linkId": "obs_code",
                            "definition": "http://hl7.org/fhir/StructureDefinition/Observation#Observation.code",
                            "text": "Code de l'observation",
                            "type": "choice",
                            "readOnly": true,
                            "answerOption": [
                                {
                                    "valueCoding": {
                                        "system": "http://chun.upcare.fr/fhir/CodeSystem/upcare-observation-cs",
                                        "code": "score-moyen-satisfaction",
                                        "display": "Score moyen de satisfaction"
                                    },
                                    "initialSelected": true
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    "questionnaire": "http://chun.upcare.fr/fhir/Questionnaire/Questionnaire-UpCare|0.1.0",
    "status": "in-progress",
    "subject": {
        "reference": "Organization/UCA-MATERNITE"
    },
    "authored": "2026-06-19T14:43:03+00:00",
    "item": [
        {
            "linkId": "2344e4b2-f5eb-4f54-88fa-51686a47f261",
            "text": "Ce questionnaire aborde différents aspects de votre vie il vous est demandé d’évaluer votre satisfaction. Il se compose d’une série d’énoncés pour lesquels vous devez indiquer votre position sur une échelle de satisfaction composée de 6 modalités « pas du tout satisfait » à « tout à fait satisfait »\nSoyez spontané et sincère dans vos réponses.\nCe questionnaire est anonyme, confidentiel et aucune réponse individuelle ne sera communiquée."
        },
        {
            "linkId": "05e5342c-4745-46e5-898b-9de7f6345085",
            "text": "Informations générales",
            "item": [
                {
                    "linkId": "aee11f5c-d4fa-4e78-8fe7-9a23ef692434",
                    "text": "Vous êtes"
                },
                {
                    "linkId": "87d0898a-eb83-43bc-83e0-3705536413b2",
                    "text": "Votre âge"
                },
                {
                    "linkId": "7b1d0342-56d9-4011-ac62-e9466bb0e872",
                    "text": "Votre date d'arrivée dans le service"
                },
                {
                    "linkId": "c4a48ada-a01a-4d39-a067-ea3e99d5035c",
                    "text": "Votre fonction"
                }
            ]
        },
        {
            "linkId": "de1f4934-cc25-4fd3-9e92-15057c488379",
            "text": "Questionnaire",
            "item": [
                {
                    "linkId": "429b294f-66f8-4d5a-d42d-b9955d1d9b66",
                    "text": "A. Organisation et contenu du travail",
                    "item": [
                        {
                            "linkId": "59a247f8-578f-4c31-8f7c-8d08b0b552fb",
                            "text": "La manière dont le travail est organisé dans mon service"
                        }
                    ]
                },
                {
                    "linkId": "75c01161-9998-4212-82d0-58889ad89829",
                    "text": "B. Relation entre personnel",
                    "item": [
                        {
                            "linkId": "bfdc7394-7de1-4052-8652-de260795dc46",
                            "text": "Les relations humaines entre professionnels dans le service"
                        }
                    ]
                }
            ]
        },
        {
            "linkId": "resultats-observation",
            "definition": "http://hl7.org/fhir/StructureDefinition/Observation#Observation",
            "text": "Résultats calculés",
            "item": [
                {
                    "linkId": "score_moyen",
                    "definition": "http://hl7.org/fhir/StructureDefinition/Observation#Observation.valueQuantity.value",
                    "text": "Score moyen de satisfaction"
                },
                {
                    "linkId": "obs_status",
                    "definition": "http://hl7.org/fhir/StructureDefinition/Observation#Observation.status",
                    "text": "Statut de l'observation"
                },
                {
                    "linkId": "obs_code",
                    "definition": "http://hl7.org/fhir/StructureDefinition/Observation#Observation.code",
                    "text": "Code de l'observation"
                }
            ]
        }
    ]
} as any;

const questionnaireChru = qrChru.contained?.[0];

export const QuestionnaireCHRU: StoryObj<QuestionnaireDisplayProps> = {
  ...Template,
  args: {
    questionnaire: questionnaireChru,
    questionnaireResponse: qrChru,
    valueSetLoader: valueSetLoaderMock,
    onSubmit: (response) =>
      console.log("Submitted CHRU response:", JSON.stringify(response, null, 2)),
  },
};
