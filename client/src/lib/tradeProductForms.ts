// Trade Product Form Field Configurations
// Nigerian Trade Finance context with CBN regulatory fields

export type FieldType = 'text' | 'number' | 'date' | 'select' | 'textarea';

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  span?: 1 | 2; // Grid span (1 = half width, 2 = full width)
}

export interface FormSection {
  id: string;
  title: string;
  fields: FormField[];
}

export interface ProductFormConfig {
  productCode: string;
  productName: string;
  sections: FormSection[];
}

// Common options used across multiple forms
const currencyOptions = [
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'GBP', label: 'GBP - British Pound' },
  { value: 'NGN', label: 'NGN - Nigerian Naira' },
  { value: 'CNY', label: 'CNY - Chinese Yuan' },
  { value: 'JPY', label: 'JPY - Japanese Yen' },
  { value: 'CHF', label: 'CHF - Swiss Franc' },
  { value: 'AED', label: 'AED - UAE Dirham' },
];

const shippingModeOptions = [
  { value: 'sea', label: 'Sea Freight' },
  { value: 'air', label: 'Air Freight' },
  { value: 'land', label: 'Land Transport' },
  { value: 'multimodal', label: 'Multimodal' },
];

const paymentTermsOptions = [
  { value: 'advance', label: 'Advance Payment' },
  { value: 'lc', label: 'Letter of Credit' },
  { value: 'da', label: 'Documents Against Acceptance (D/A)' },
  { value: 'dp', label: 'Documents Against Payment (D/P)' },
  { value: 'open', label: 'Open Account' },
  { value: 'cad', label: 'Cash Against Documents' },
];

const incotermsOptions = [
  { value: 'EXW', label: 'EXW - Ex Works' },
  { value: 'FCA', label: 'FCA - Free Carrier' },
  { value: 'FAS', label: 'FAS - Free Alongside Ship' },
  { value: 'FOB', label: 'FOB - Free On Board' },
  { value: 'CFR', label: 'CFR - Cost and Freight' },
  { value: 'CIF', label: 'CIF - Cost, Insurance & Freight' },
  { value: 'CPT', label: 'CPT - Carriage Paid To' },
  { value: 'CIP', label: 'CIP - Carriage & Insurance Paid To' },
  { value: 'DAP', label: 'DAP - Delivered At Place' },
  { value: 'DPU', label: 'DPU - Delivered at Place Unloaded' },
  { value: 'DDP', label: 'DDP - Delivered Duty Paid' },
];

const nigerianPortsOptions = [
  { value: 'apapa', label: 'Apapa Port, Lagos' },
  { value: 'tincan', label: 'Tin Can Island Port, Lagos' },
  { value: 'onne', label: 'Onne Port, Rivers' },
  { value: 'phc', label: 'Port Harcourt Port' },
  { value: 'calabar', label: 'Calabar Port' },
  { value: 'warri', label: 'Warri Port' },
  { value: 'lagos_airport', label: 'Murtala Muhammed Airport, Lagos' },
  { value: 'abuja_airport', label: 'Nnamdi Azikiwe Airport, Abuja' },
  { value: 'kano_airport', label: 'Mallam Aminu Kano Airport' },
  { value: 'phc_airport', label: 'Port Harcourt International Airport' },
];

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

const countryOptions = [
  { value: 'CN', label: 'China' },
  { value: 'US', label: 'United States' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'IN', label: 'India' },
  { value: 'JP', label: 'Japan' },
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'ZA', label: 'South Africa' },
  { value: 'GH', label: 'Ghana' },
  { value: 'KE', label: 'Kenya' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'IT', label: 'Italy' },
  { value: 'BR', label: 'Brazil' },
  { value: 'SG', label: 'Singapore' },
  { value: 'TR', label: 'Turkey' },
  { value: 'MY', label: 'Malaysia' },
  { value: 'TH', label: 'Thailand' },
  { value: 'OTHER', label: 'Other' },
];

const paymentModeOptions = [
  { value: 'wire', label: 'Wire Transfer' },
  { value: 'swift', label: 'SWIFT Transfer' },
  { value: 'draft', label: 'Bank Draft' },
  { value: 'cheque', label: 'Cheque' },
];

const businessNatureOptions = [
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'trading', label: 'Trading/Import-Export' },
  { value: 'services', label: 'Services' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'oil_gas', label: 'Oil & Gas' },
  { value: 'construction', label: 'Construction' },
  { value: 'telecommunications', label: 'Telecommunications' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'financial', label: 'Financial Services' },
  { value: 'other', label: 'Other' },
];

const transactionPurposeOptions = [
  { value: 'goods_import', label: 'Import of Goods' },
  { value: 'services', label: 'Service Payment' },
  { value: 'capital_goods', label: 'Capital Equipment' },
  { value: 'raw_materials', label: 'Raw Materials' },
  { value: 'machinery', label: 'Machinery & Equipment' },
  { value: 'medical', label: 'Medical Supplies' },
  { value: 'educational', label: 'Educational Materials' },
  { value: 'software', label: 'Software & Technology' },
  { value: 'other', label: 'Other' },
];

// ==================== FORM M (IMPORT) ====================
const formMConfig: ProductFormConfig = {
  productCode: 'FORMM',
  productName: 'Form M (Import)',
  sections: [
    {
      id: 'importer_info',
      title: 'Importer Information',
      fields: [
        { name: 'businessName', label: 'Business Name', type: 'text', required: true, placeholder: 'Enter registered business name' },
        { name: 'businessAddress', label: 'Business Address', type: 'textarea', required: true, placeholder: 'Full registered address', span: 2 },
        { name: 'rcNumber', label: 'RC Number (CAC)', type: 'text', required: true, placeholder: 'e.g., RC123456' },
        { name: 'tin', label: 'Tax Identification Number (TIN)', type: 'text', required: true, placeholder: 'Enter TIN' },
        { name: 'bankAccountNumber', label: 'Bank Account Number', type: 'text', required: true, placeholder: 'Domiciliary account number' },
        { name: 'bankName', label: 'Bank Name & Branch', type: 'text', required: true, placeholder: 'e.g., Union Bank, Marina Branch' },
        { name: 'email', label: 'Email Address', type: 'text', required: true, placeholder: 'company@example.com' },
        { name: 'phone', label: 'Phone Number', type: 'text', required: true, placeholder: '+234...' },
      ],
    },
    {
      id: 'importation_details',
      title: 'Importation Details',
      fields: [
        { name: 'purposeOfImport', label: 'Purpose of Import', type: 'select', required: true, options: transactionPurposeOptions },
        { name: 'countryOfOrigin', label: 'Country of Origin', type: 'select', required: true, options: countryOptions },
        { name: 'productDescription', label: 'Product/Consignment Description', type: 'textarea', required: true, placeholder: 'Detailed description of goods being imported', span: 2 },
        { name: 'invoiceAmount', label: 'Invoice Amount', type: 'number', required: true, placeholder: 'Total invoice value' },
        { name: 'currency', label: 'Currency', type: 'select', required: true, options: currencyOptions },
        { name: 'quantity', label: 'Quantity', type: 'text', required: true, placeholder: 'e.g., 500 units, 20 containers' },
        { name: 'weight', label: 'Weight (KG)', type: 'number', required: false, placeholder: 'Total weight in KG' },
        { name: 'shippingMode', label: 'Shipping Mode', type: 'select', required: true, options: shippingModeOptions },
        { name: 'estimatedArrivalDate', label: 'Estimated Arrival Date', type: 'date', required: true },
        { name: 'customsDeclarationNumber', label: 'Customs Declaration Number', type: 'text', required: false, placeholder: 'If available' },
        { name: 'proformaInvoiceNumber', label: 'Proforma Invoice Number', type: 'text', required: true, placeholder: 'Supplier invoice reference' },
        { name: 'hsCode', label: 'HS Code', type: 'text', required: false, placeholder: 'Harmonized System Code' },
      ],
    },
    {
      id: 'bank_info',
      title: 'Bank Information',
      fields: [
        { name: 'bankBranchCode', label: 'Bank Branch Code', type: 'text', required: true, placeholder: 'Branch sort code' },
        { name: 'authorizedOfficer', label: 'Authorized Bank Officer', type: 'text', required: false, placeholder: 'Relationship manager name' },
        { name: 'bankSwiftCode', label: 'Bank SWIFT/BIC Code', type: 'text', required: true, placeholder: 'e.g.,ABORNGLA' },
        { name: 'correspondentBank', label: 'Correspondent Bank', type: 'text', required: false, placeholder: 'If applicable' },
        { name: 'priority', label: 'Priority', type: 'select', required: true, options: priorityOptions },
      ],
    },
  ],
};

// ==================== FORM A (FOREX DECLARATION) ====================
const formAConfig: ProductFormConfig = {
  productCode: 'FORMA',
  productName: 'Form A (Forex Declaration)',
  sections: [
    {
      id: 'business_details',
      title: 'Business Details',
      fields: [
        { name: 'businessName', label: 'Business Name', type: 'text', required: true, placeholder: 'Registered business name' },
        { name: 'tin', label: 'Tax Identification Number (TIN)', type: 'text', required: true, placeholder: 'Enter TIN' },
        { name: 'companyAddress', label: 'Company Address', type: 'textarea', required: true, placeholder: 'Full registered address', span: 2 },
        { name: 'natureOfBusiness', label: 'Nature of Business', type: 'select', required: true, options: businessNatureOptions },
        { name: 'rcNumber', label: 'RC Number (CAC)', type: 'text', required: true, placeholder: 'e.g., RC123456' },
      ],
    },
    {
      id: 'transaction_details',
      title: 'Transaction Details',
      fields: [
        { name: 'amount', label: 'Amount to be Remitted', type: 'number', required: true, placeholder: 'Enter amount' },
        { name: 'currency', label: 'Currency', type: 'select', required: true, options: currencyOptions },
        { name: 'purposeOfTransaction', label: 'Purpose of Transaction', type: 'select', required: true, options: transactionPurposeOptions },
        { name: 'beneficiaryName', label: 'Beneficiary Name', type: 'text', required: true, placeholder: 'Name of recipient' },
        { name: 'beneficiaryCountry', label: 'Beneficiary Country', type: 'select', required: true, options: countryOptions },
        { name: 'beneficiaryAddress', label: 'Beneficiary Address', type: 'textarea', required: true, placeholder: 'Full address of beneficiary', span: 2 },
        { name: 'paymentMode', label: 'Payment Mode', type: 'select', required: true, options: paymentModeOptions },
        { name: 'goodsDescription', label: 'Goods/Services Description', type: 'textarea', required: true, placeholder: 'Description of goods or services', span: 2 },
        { name: 'invoiceNumber', label: 'Invoice Number', type: 'text', required: true, placeholder: 'Reference invoice number' },
        { name: 'invoiceDate', label: 'Invoice Date', type: 'date', required: true },
      ],
    },
    {
      id: 'bank_details',
      title: 'Bank Details',
      fields: [
        { name: 'bankName', label: 'Bank Name', type: 'text', required: true, placeholder: 'Applicant bank name' },
        { name: 'bankAddress', label: 'Bank Address', type: 'text', required: true, placeholder: 'Bank branch address' },
        { name: 'accountNumber', label: 'Account Number', type: 'text', required: true, placeholder: 'Domiciliary account' },
        { name: 'bankBranchCode', label: 'Branch Code', type: 'text', required: true, placeholder: 'Sort code' },
        { name: 'swiftCode', label: 'SWIFT Code', type: 'text', required: true, placeholder: 'e.g.,ABORNGLA' },
        { name: 'beneficiaryBankName', label: 'Beneficiary Bank Name', type: 'text', required: true, placeholder: 'Recipient bank' },
        { name: 'beneficiaryBankSwift', label: 'Beneficiary Bank SWIFT', type: 'text', required: true, placeholder: 'Recipient bank SWIFT' },
        { name: 'beneficiaryAccountNumber', label: 'Beneficiary Account Number', type: 'text', required: true, placeholder: 'Recipient account' },
      ],
    },
    {
      id: 'declaration',
      title: 'Declaration',
      fields: [
        { name: 'authorizedRepName', label: 'Authorized Representative Name', type: 'text', required: true, placeholder: 'Full name of signatory' },
        { name: 'designation', label: 'Designation', type: 'text', required: true, placeholder: 'e.g., Managing Director' },
        { name: 'declarationDate', label: 'Declaration Date', type: 'date', required: true },
        { name: 'priority', label: 'Priority', type: 'select', required: true, options: priorityOptions },
      ],
    },
  ],
};

// ==================== FORM NXP (EXPORT) ====================
const formNXPConfig: ProductFormConfig = {
  productCode: 'FORMNXP',
  productName: 'Form NXP (Export)',
  sections: [
    {
      id: 'exporter_info',
      title: 'Exporter Information',
      fields: [
        { name: 'exporterName', label: 'Exporter Name', type: 'text', required: true, placeholder: 'Registered business name' },
        { name: 'exporterAddress', label: 'Address', type: 'textarea', required: true, placeholder: 'Full registered address', span: 2 },
        { name: 'rcNumber', label: 'RC Number (CAC)', type: 'text', required: true, placeholder: 'e.g., RC123456' },
        { name: 'tin', label: 'Tax Identification Number (TIN)', type: 'text', required: true, placeholder: 'Enter TIN' },
        { name: 'nepcRegNumber', label: 'NEPC Registration Number', type: 'text', required: false, placeholder: 'Nigerian Export Promotion Council reg.' },
        { name: 'bankAccountNumber', label: 'Bank Account Number', type: 'text', required: true, placeholder: 'Domiciliary account' },
      ],
    },
    {
      id: 'export_transaction',
      title: 'Export Transaction',
      fields: [
        { name: 'invoiceNumber', label: 'Invoice Number', type: 'text', required: true, placeholder: 'Export invoice reference' },
        { name: 'invoiceDate', label: 'Invoice Date', type: 'date', required: true },
        { name: 'goodsDescription', label: 'Goods Description', type: 'textarea', required: true, placeholder: 'Detailed description of goods for export', span: 2 },
        { name: 'hsCode', label: 'HS Code', type: 'text', required: true, placeholder: 'Harmonized System Code' },
        { name: 'totalExportValue', label: 'Total Export Value', type: 'number', required: true, placeholder: 'FOB value' },
        { name: 'currency', label: 'Currency', type: 'select', required: true, options: currencyOptions },
        { name: 'destinationCountry', label: 'Destination Country', type: 'select', required: true, options: countryOptions },
        { name: 'buyerName', label: 'Buyer Name', type: 'text', required: true, placeholder: 'Foreign buyer name' },
        { name: 'buyerAddress', label: 'Buyer Address', type: 'textarea', required: true, placeholder: 'Foreign buyer address', span: 2 },
        { name: 'paymentTerms', label: 'Payment Terms', type: 'select', required: true, options: paymentTermsOptions },
        { name: 'transportMode', label: 'Transport Mode', type: 'select', required: true, options: shippingModeOptions },
        { name: 'portOfLoading', label: 'Port of Loading', type: 'select', required: true, options: nigerianPortsOptions },
        { name: 'expectedDepartureDate', label: 'Expected Departure Date', type: 'date', required: true },
      ],
    },
    {
      id: 'bank_details',
      title: 'Bank Details',
      fields: [
        { name: 'bankName', label: 'Bank Name', type: 'text', required: true, placeholder: 'Exporter bank name' },
        { name: 'bankBranchCode', label: 'Branch & Code', type: 'text', required: true, placeholder: 'Branch name and sort code' },
        { name: 'swiftCode', label: 'SWIFT Code', type: 'text', required: true, placeholder: 'e.g.,ABORNGLA' },
      ],
    },
    {
      id: 'proceeds_declaration',
      title: 'Proceeds Declaration',
      fields: [
        { name: 'repatriationPeriod', label: 'Repatriation Period (Days)', type: 'number', required: true, placeholder: 'e.g., 90 or 180 days' },
        { name: 'repatriationConfirmation', label: 'Repatriation Confirmation', type: 'select', required: true, options: [
          { value: 'yes', label: 'I confirm proceeds will be repatriated to Nigeria' },
          { value: 'partial', label: 'Partial repatriation (with CBN approval)' },
        ]},
        { name: 'declarationDate', label: 'Declaration Date', type: 'date', required: true },
        { name: 'priority', label: 'Priority', type: 'select', required: true, options: priorityOptions },
      ],
    },
  ],
};

// ==================== PAAR (PRE-ARRIVAL ASSESSMENT REPORT) ====================
const paarConfig: ProductFormConfig = {
  productCode: 'PAAR',
  productName: 'PAAR (Pre-Arrival Assessment Report)',
  sections: [
    {
      id: 'import_details',
      title: 'Import Details',
      fields: [
        { name: 'importerName', label: 'Importer Name', type: 'text', required: true, placeholder: 'Registered business name' },
        { name: 'importerAddress', label: 'Importer Address', type: 'textarea', required: true, placeholder: 'Full registered address', span: 2 },
        { name: 'tin', label: 'Tax Identification Number (TIN)', type: 'text', required: true, placeholder: 'Enter TIN' },
        { name: 'formMNumber', label: 'Form M Number', type: 'text', required: true, placeholder: 'Related Form M reference' },
        { name: 'consignmentRefNumber', label: 'Consignment Reference Number', type: 'text', required: true, placeholder: 'Shipment reference' },
        { name: 'productDescription', label: 'Product Description', type: 'textarea', required: true, placeholder: 'Detailed description of imported goods', span: 2 },
        { name: 'quantity', label: 'Quantity', type: 'text', required: true, placeholder: 'e.g., 500 units, 20 containers' },
        { name: 'weight', label: 'Weight (KG)', type: 'number', required: true, placeholder: 'Total weight' },
        { name: 'valueOfGoods', label: 'Value of Goods', type: 'number', required: true, placeholder: 'CIF value' },
        { name: 'currency', label: 'Currency', type: 'select', required: true, options: currencyOptions },
      ],
    },
    {
      id: 'customs_details',
      title: 'Customs Details',
      fields: [
        { name: 'hsCode', label: 'HS Code', type: 'text', required: true, placeholder: 'Harmonized System Code' },
        { name: 'dutyClassification', label: 'Customs Duty Classification', type: 'text', required: true, placeholder: 'Tariff classification' },
        { name: 'customsDutyAmount', label: 'Customs Duty Amount (NGN)', type: 'number', required: true, placeholder: 'Estimated duty payable' },
        { name: 'vatAmount', label: 'VAT Amount (NGN)', type: 'number', required: true, placeholder: 'Value Added Tax' },
        { name: 'leviesAmount', label: 'Levies & Surcharges (NGN)', type: 'number', required: false, placeholder: 'Other charges' },
        { name: 'portOfEntry', label: 'Port of Entry', type: 'select', required: true, options: nigerianPortsOptions },
        { name: 'examinationReport', label: 'Examination Report Status', type: 'select', required: false, options: [
          { value: 'pending', label: 'Pending' },
          { value: 'scheduled', label: 'Scheduled' },
          { value: 'completed', label: 'Completed' },
        ]},
      ],
    },
    {
      id: 'shipping_transport',
      title: 'Shipping & Transport Details',
      fields: [
        { name: 'shippingCompany', label: 'Shipping Company', type: 'text', required: true, placeholder: 'Carrier name' },
        { name: 'voyageNumber', label: 'Voyage/Flight Number', type: 'text', required: true, placeholder: 'Vessel voyage or flight number' },
        { name: 'billOfLadingNumber', label: 'Bill of Lading Number', type: 'text', required: true, placeholder: 'B/L reference' },
        { name: 'transportMode', label: 'Transport Mode', type: 'select', required: true, options: shippingModeOptions },
        { name: 'arrivalDate', label: 'Expected Arrival Date', type: 'date', required: true },
        { name: 'vesselName', label: 'Vessel/Aircraft Name', type: 'text', required: false, placeholder: 'Name of ship or aircraft' },
        { name: 'countryOfOrigin', label: 'Country of Origin', type: 'select', required: true, options: countryOptions },
        { name: 'portOfLoading', label: 'Port of Loading', type: 'text', required: true, placeholder: 'Origin port name' },
      ],
    },
    {
      id: 'certification',
      title: 'Certification',
      fields: [
        { name: 'customsOfficerName', label: 'Customs Officer Name', type: 'text', required: false, placeholder: 'Assigned officer (if known)' },
        { name: 'certificationDate', label: 'Certification Date', type: 'date', required: false },
        { name: 'paarStatus', label: 'PAAR Status', type: 'select', required: true, options: [
          { value: 'draft', label: 'Draft' },
          { value: 'submitted', label: 'Submitted' },
          { value: 'processing', label: 'Processing' },
          { value: 'approved', label: 'Approved' },
          { value: 'rejected', label: 'Rejected' },
        ]},
        { name: 'priority', label: 'Priority', type: 'select', required: true, options: priorityOptions },
      ],
    },
  ],
};

// ==================== IMPORT LC (LETTER OF CREDIT) ====================
const importLCConfig: ProductFormConfig = {
  productCode: 'IMPORTLC',
  productName: 'Import LC (Letter of Credit)',
  sections: [
    {
      id: 'buyer_seller_info',
      title: 'Buyer & Seller Information',
      fields: [
        { name: 'importerName', label: 'Importer (Buyer) Name', type: 'text', required: true, placeholder: 'Applicant name' },
        { name: 'importerAddress', label: 'Importer Address', type: 'textarea', required: true, placeholder: 'Full address', span: 2 },
        { name: 'importerPhone', label: 'Importer Phone', type: 'text', required: true, placeholder: '+234...' },
        { name: 'importerEmail', label: 'Importer Email', type: 'text', required: true, placeholder: 'company@example.com' },
        { name: 'exporterName', label: 'Exporter (Seller) Name', type: 'text', required: true, placeholder: 'Beneficiary name' },
        { name: 'exporterAddress', label: 'Exporter Address', type: 'textarea', required: true, placeholder: 'Full foreign address', span: 2 },
        { name: 'exporterPhone', label: 'Exporter Phone', type: 'text', required: false, placeholder: 'Beneficiary phone' },
        { name: 'exporterEmail', label: 'Exporter Email', type: 'text', required: false, placeholder: 'Beneficiary email' },
        { name: 'exporterCountry', label: 'Exporter Country', type: 'select', required: true, options: countryOptions },
      ],
    },
    {
      id: 'transaction_details',
      title: 'Transaction Details',
      fields: [
        { name: 'lcAmount', label: 'LC Amount', type: 'number', required: true, placeholder: 'Total LC value' },
        { name: 'currency', label: 'Currency', type: 'select', required: true, options: currencyOptions },
        { name: 'tolerance', label: 'Tolerance (+/- %)', type: 'number', required: false, placeholder: 'e.g., 5 or 10' },
        { name: 'productDescription', label: 'Product/Service Description', type: 'textarea', required: true, placeholder: 'Detailed goods description as per proforma', span: 2 },
        { name: 'incoterms', label: 'Delivery Terms (Incoterms)', type: 'select', required: true, options: incotermsOptions },
        { name: 'paymentTerms', label: 'Payment Terms', type: 'select', required: true, options: [
          { value: 'sight', label: 'At Sight' },
          { value: 'usance_30', label: 'Usance - 30 Days' },
          { value: 'usance_60', label: 'Usance - 60 Days' },
          { value: 'usance_90', label: 'Usance - 90 Days' },
          { value: 'usance_120', label: 'Usance - 120 Days' },
          { value: 'usance_180', label: 'Usance - 180 Days' },
          { value: 'deferred', label: 'Deferred Payment' },
        ]},
        { name: 'latestShipmentDate', label: 'Latest Shipment Date', type: 'date', required: true },
        { name: 'expiryDate', label: 'LC Expiry Date', type: 'date', required: true },
        { name: 'placeOfExpiry', label: 'Place of Expiry', type: 'text', required: true, placeholder: 'e.g., Lagos, Nigeria' },
        { name: 'partialShipment', label: 'Partial Shipment', type: 'select', required: true, options: [
          { value: 'allowed', label: 'Allowed' },
          { value: 'not_allowed', label: 'Not Allowed' },
        ]},
        { name: 'transshipment', label: 'Transshipment', type: 'select', required: true, options: [
          { value: 'allowed', label: 'Allowed' },
          { value: 'not_allowed', label: 'Not Allowed' },
        ]},
      ],
    },
    {
      id: 'bank_details',
      title: 'Bank Details',
      fields: [
        { name: 'issuingBank', label: 'Issuing Bank (Importer\'s Bank)', type: 'text', required: true, placeholder: 'e.g., Union Bank of Nigeria' },
        { name: 'issuingBankSwift', label: 'Issuing Bank SWIFT', type: 'text', required: true, placeholder: 'e.g.,ABORNGLA' },
        { name: 'advisingBank', label: 'Advising Bank', type: 'text', required: true, placeholder: 'Beneficiary\'s bank' },
        { name: 'advisingBankSwift', label: 'Advising Bank SWIFT', type: 'text', required: true, placeholder: 'Beneficiary bank SWIFT' },
        { name: 'advisingBankCountry', label: 'Advising Bank Country', type: 'select', required: true, options: countryOptions },
        { name: 'confirmationRequired', label: 'Confirmation Required', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes - Confirmed LC' },
          { value: 'no', label: 'No - Unconfirmed LC' },
          { value: 'may_add', label: 'May Add (at beneficiary cost)' },
        ]},
        { name: 'confirmingBank', label: 'Confirming Bank (if applicable)', type: 'text', required: false, placeholder: 'Bank adding confirmation' },
      ],
    },
    {
      id: 'lc_terms',
      title: 'LC Terms & Documents',
      fields: [
        { name: 'portOfLoading', label: 'Port of Loading', type: 'text', required: true, placeholder: 'e.g., Shanghai Port, China' },
        { name: 'portOfDischarge', label: 'Port of Discharge', type: 'select', required: true, options: nigerianPortsOptions },
        { name: 'requiredDocuments', label: 'Required Presentation Documents', type: 'textarea', required: true, placeholder: 'List all required documents:\n- Commercial Invoice\n- Bill of Lading\n- Packing List\n- Certificate of Origin\n- Insurance Certificate', span: 2 },
        { name: 'additionalConditions', label: 'Additional Conditions', type: 'textarea', required: false, placeholder: 'Any special conditions or instructions', span: 2 },
        { name: 'chargesInside', label: 'Charges Inside Nigeria', type: 'select', required: true, options: [
          { value: 'applicant', label: 'For Applicant Account' },
          { value: 'beneficiary', label: 'For Beneficiary Account' },
        ]},
        { name: 'chargesOutside', label: 'Charges Outside Nigeria', type: 'select', required: true, options: [
          { value: 'applicant', label: 'For Applicant Account' },
          { value: 'beneficiary', label: 'For Beneficiary Account' },
        ]},
        { name: 'formMNumber', label: 'Form M Number', type: 'text', required: true, placeholder: 'Related Form M reference' },
        { name: 'priority', label: 'Priority', type: 'select', required: true, options: priorityOptions },
      ],
    },
  ],
};

// ==================== BILLS FOR COLLECTION ====================
const billsForCollectionConfig: ProductFormConfig = {
  productCode: 'BFC',
  productName: 'Bills for Collection',
  sections: [
    {
      id: 'exporter_details',
      title: 'Exporter Details',
      fields: [
        { name: 'exporterName', label: 'Exporter Name', type: 'text', required: true, placeholder: 'Principal/drawer name' },
        { name: 'exporterAddress', label: 'Exporter Address', type: 'textarea', required: true, placeholder: 'Full address', span: 2 },
        { name: 'exporterBankName', label: 'Exporter\'s Bank Name', type: 'text', required: true, placeholder: 'Remitting bank' },
        { name: 'exporterBankAddress', label: 'Exporter\'s Bank Address', type: 'text', required: true, placeholder: 'Bank address' },
        { name: 'exporterBankSwift', label: 'Exporter\'s Bank SWIFT', type: 'text', required: true, placeholder: 'SWIFT/BIC code' },
        { name: 'exporterAccountNumber', label: 'Exporter Account Number', type: 'text', required: true, placeholder: 'Account for proceeds' },
      ],
    },
    {
      id: 'importer_details',
      title: 'Importer Details',
      fields: [
        { name: 'importerName', label: 'Importer Name', type: 'text', required: true, placeholder: 'Drawee name' },
        { name: 'importerAddress', label: 'Importer Address', type: 'textarea', required: true, placeholder: 'Full address', span: 2 },
        { name: 'importerBankName', label: 'Importer\'s Bank Name', type: 'text', required: true, placeholder: 'Collecting bank' },
        { name: 'importerBankAddress', label: 'Importer\'s Bank Address', type: 'text', required: true, placeholder: 'Bank address' },
        { name: 'importerBankSwift', label: 'Importer\'s Bank SWIFT', type: 'text', required: true, placeholder: 'SWIFT/BIC code' },
        { name: 'importerCountry', label: 'Importer Country', type: 'select', required: true, options: countryOptions },
      ],
    },
    {
      id: 'transaction_details',
      title: 'Transaction Details',
      fields: [
        { name: 'billOfExchangeNumber', label: 'Bill of Exchange Number', type: 'text', required: true, placeholder: 'Draft reference' },
        { name: 'invoiceNumber', label: 'Invoice Number', type: 'text', required: true, placeholder: 'Commercial invoice ref' },
        { name: 'invoiceDate', label: 'Invoice Date', type: 'date', required: true },
        { name: 'goodsDescription', label: 'Goods Description', type: 'textarea', required: true, placeholder: 'Description of goods', span: 2 },
        { name: 'totalAmount', label: 'Total Amount Due', type: 'number', required: true, placeholder: 'Collection amount' },
        { name: 'currency', label: 'Currency', type: 'select', required: true, options: currencyOptions },
        { name: 'collectionType', label: 'Collection Type', type: 'select', required: true, options: [
          { value: 'dp', label: 'D/P - Documents Against Payment' },
          { value: 'da', label: 'D/A - Documents Against Acceptance' },
        ]},
        { name: 'tenor', label: 'Tenor (if D/A)', type: 'text', required: false, placeholder: 'e.g., 30 days from sight' },
        { name: 'maturityDate', label: 'Maturity Date (if D/A)', type: 'date', required: false },
      ],
    },
    {
      id: 'bank_handling',
      title: 'Bank Handling Instructions',
      fields: [
        { name: 'presentingBank', label: 'Presenting Bank', type: 'text', required: false, placeholder: 'If different from collecting bank' },
        { name: 'bankCharges', label: 'Bank Charges', type: 'select', required: true, options: [
          { value: 'drawer', label: 'For Drawer (Exporter) Account' },
          { value: 'drawee', label: 'For Drawee (Importer) Account' },
          { value: 'shared', label: 'Shared' },
        ]},
        { name: 'protestInstructions', label: 'Protest Instructions', type: 'select', required: true, options: [
          { value: 'protest', label: 'Protest for Non-Payment/Non-Acceptance' },
          { value: 'no_protest', label: 'Do Not Protest' },
        ]},
        { name: 'collectionInstructions', label: 'Collection Instructions', type: 'textarea', required: true, placeholder: 'Special instructions for collecting bank', span: 2 },
        { name: 'documentsEnclosed', label: 'Documents Enclosed', type: 'textarea', required: true, placeholder: 'List all documents:\n- Bill of Exchange\n- Commercial Invoice\n- Bill of Lading\n- Packing List', span: 2 },
        { name: 'priority', label: 'Priority', type: 'select', required: true, options: priorityOptions },
      ],
    },
  ],
};

// ==================== SHIPPING DOCUMENTS ====================
const shippingDocumentsConfig: ProductFormConfig = {
  productCode: 'SHIPPINGDOC',
  productName: 'Shipping Documents',
  sections: [
    {
      id: 'party_info',
      title: 'Importer/Exporter Information',
      fields: [
        { name: 'partyRole', label: 'Party Role', type: 'select', required: true, options: [
          { value: 'importer', label: 'Importer (Consignee)' },
          { value: 'exporter', label: 'Exporter (Shipper)' },
        ]},
        { name: 'partyName', label: 'Party Name', type: 'text', required: true, placeholder: 'Company name' },
        { name: 'partyAddress', label: 'Address', type: 'textarea', required: true, placeholder: 'Full address', span: 2 },
        { name: 'contactPerson', label: 'Contact Person', type: 'text', required: true, placeholder: 'Name' },
        { name: 'contactPhone', label: 'Contact Phone', type: 'text', required: true, placeholder: '+234...' },
        { name: 'contactEmail', label: 'Contact Email', type: 'text', required: true, placeholder: 'email@company.com' },
      ],
    },
    {
      id: 'shipping_info',
      title: 'Shipping Information',
      fields: [
        { name: 'billOfLadingNumber', label: 'Bill of Lading Number', type: 'text', required: true, placeholder: 'B/L or AWB number' },
        { name: 'billOfLadingDate', label: 'B/L Date', type: 'date', required: true },
        { name: 'billOfLadingType', label: 'B/L Type', type: 'select', required: true, options: [
          { value: 'original', label: 'Original B/L' },
          { value: 'seaway', label: 'Sea Waybill' },
          { value: 'awb', label: 'Air Waybill' },
          { value: 'multimodal', label: 'Multimodal Transport Document' },
        ]},
        { name: 'shippingDate', label: 'Shipping Date', type: 'date', required: true },
        { name: 'portOfDeparture', label: 'Port of Departure', type: 'text', required: true, placeholder: 'Loading port' },
        { name: 'portOfArrival', label: 'Port of Arrival', type: 'select', required: true, options: nigerianPortsOptions },
        { name: 'transportMode', label: 'Mode of Transport', type: 'select', required: true, options: shippingModeOptions },
        { name: 'vesselName', label: 'Vessel/Aircraft Name', type: 'text', required: true, placeholder: 'Ship or airline name' },
        { name: 'voyageNumber', label: 'Voyage/Flight Number', type: 'text', required: true, placeholder: 'Voyage or flight ref' },
        { name: 'containerNumbers', label: 'Container Numbers', type: 'textarea', required: false, placeholder: 'List container numbers (one per line)', span: 2 },
        { name: 'numberOfPackages', label: 'Number of Packages', type: 'number', required: true, placeholder: 'Total packages' },
        { name: 'grossWeight', label: 'Gross Weight (KG)', type: 'number', required: true, placeholder: 'Total weight' },
      ],
    },
    {
      id: 'payment_terms',
      title: 'Payment & Insurance',
      fields: [
        { name: 'freightPayment', label: 'Freight Payment Method', type: 'select', required: true, options: [
          { value: 'prepaid', label: 'Freight Prepaid' },
          { value: 'collect', label: 'Freight Collect' },
        ]},
        { name: 'freightAmount', label: 'Freight Amount', type: 'number', required: false, placeholder: 'If known' },
        { name: 'freightCurrency', label: 'Freight Currency', type: 'select', required: false, options: currencyOptions },
        { name: 'cargoInsured', label: 'Cargo Insured', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ]},
        { name: 'insuranceProvider', label: 'Insurance Provider', type: 'text', required: false, placeholder: 'Insurance company name' },
        { name: 'insurancePolicyNumber', label: 'Insurance Policy Number', type: 'text', required: false, placeholder: 'Policy reference' },
        { name: 'insuredValue', label: 'Insured Value', type: 'number', required: false, placeholder: 'CIF + 10%' },
        { name: 'insuranceCurrency', label: 'Insurance Currency', type: 'select', required: false, options: currencyOptions },
      ],
    },
    {
      id: 'customs_duty',
      title: 'Customs & Duty Information',
      fields: [
        { name: 'customsReceiptNumber', label: 'Customs Receipt Number', type: 'text', required: false, placeholder: 'If cleared' },
        { name: 'singleGoodsDeclaration', label: 'SGD Number', type: 'text', required: false, placeholder: 'Single Goods Declaration ref' },
        { name: 'dutiesPaid', label: 'Duties Paid (NGN)', type: 'number', required: false, placeholder: 'Total duties paid' },
        { name: 'taxPaid', label: 'VAT/Tax Paid (NGN)', type: 'number', required: false, placeholder: 'VAT amount' },
        { name: 'clearanceStatus', label: 'Clearance Status', type: 'select', required: true, options: [
          { value: 'pending', label: 'Pending Clearance' },
          { value: 'in_progress', label: 'Clearance In Progress' },
          { value: 'cleared', label: 'Cleared' },
          { value: 'held', label: 'Held for Examination' },
        ]},
        { name: 'releaseDate', label: 'Expected Release Date', type: 'date', required: false },
        { name: 'customsBroker', label: 'Customs Broker', type: 'text', required: false, placeholder: 'Licensed agent name' },
        { name: 'formMReference', label: 'Form M Reference', type: 'text', required: false, placeholder: 'Related Form M number' },
        { name: 'paarReference', label: 'PAAR Reference', type: 'text', required: false, placeholder: 'Related PAAR number' },
        { name: 'priority', label: 'Priority', type: 'select', required: true, options: priorityOptions },
      ],
    },
  ],
};

// ==================== EXPORT ALL CONFIGS ====================
export const tradeProductForms: Record<string, ProductFormConfig> = {
  FORMM: formMConfig,
  FORMA: formAConfig,
  FORMNXP: formNXPConfig,
  PAAR: paarConfig,
  IMPORTLC: importLCConfig,
  BFC: billsForCollectionConfig,
  SHIPPINGDOC: shippingDocumentsConfig,
};

// Helper function to get form config by product code
export function getProductFormConfig(productCode: string): ProductFormConfig | null {
  return tradeProductForms[productCode] || null;
}

// Helper to get all product codes
export function getAllProductCodes(): string[] {
  return Object.keys(tradeProductForms);
}

// Helper to initialize empty form data for a product
export function initializeFormData(productCode: string): Record<string, string> {
  const config = getProductFormConfig(productCode);
  if (!config) return {};

  const formData: Record<string, string> = {};
  config.sections.forEach(section => {
    section.fields.forEach(field => {
      formData[field.name] = '';
    });
  });
  return formData;
}
