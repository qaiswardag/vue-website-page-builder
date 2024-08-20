const vatIdList = [
    {
        country: null,
        tax_id: null,
        code: null,
    },
    {
        country: "Andorra",
        tax_id: "ad_nrt",
        code: "AD",
    },
    {
        country: "Argentina",
        tax_id: "ar_cuit",
        code: "AR",
    },
    {
        country: "Australia",
        tax_id: "au_abn",
        code: "AU",
    },
    {
        country: "Australia",
        tax_id: "au_arn",
        code: "AU",
    },
    {
        country: "Austria",
        tax_id: "eu_vat",
        code: "AT",
    },
    {
        country: "Belgium",
        tax_id: "eu_vat",
        code: "BE",
    },
    {
        country: "Bolivia",
        tax_id: "bo_tin",
        code: "BO",
    },
    {
        country: "Brazil",
        tax_id: "br_cnpj",
        code: "BR",
    },
    {
        country: "Brazil",
        tax_id: "br_cpf",
        code: "BR",
    },
    {
        country: "Bulgaria",
        tax_id: "bg_uic",
        code: "BG",
    },
    {
        country: "Bulgaria",
        tax_id: "eu_vat",
        code: "BG",
    },
    {
        country: "Canada",
        tax_id: "ca_bn",
        code: "CA",
    },
    {
        country: "Canada",
        tax_id: "ca_gst_hst",
        code: "CA",
    },

    {
        country: "Canada",
        tax_id: "ca_pst_bc",
        code: "CA",
    },
    {
        country: "Canada",
        tax_id: "ca_pst_mb",
        code: "CA",
    },
    {
        country: "Canada",
        tax_id: "ca_pst_sk",
        code: "CA",
    },
    {
        country: "Canada",
        tax_id: "ca_qst",
        code: "CA",
    },
    {
        country: "Chile",
        tax_id: "cl_tin",
        code: "CL",
    },
    {
        country: "China",
        tax_id: "cn_tin",
        code: "CN",
    },
    {
        country: "Colombia",
        tax_id: "co_nit",
        code: "CO",
    },
    {
        country: "Costa Rica",
        tax_id: "cr_tin",
        code: "CR",
    },
    {
        country: "Croatia",
        tax_id: "eu_vat",
        code: "HR",
    },
    {
        country: "Cyprus",
        tax_id: "eu_vat",
        code: "CY",
    },
    {
        country: "Czech Republic",
        tax_id: "eu_vat",
        code: "CZ",
    },
    {
        country: "Denmark",
        tax_id: "eu_vat",
        code: "DK",
    },
    {
        country: "Dominican Republic",
        tax_id: "do_rcn",
        code: "DO",
    },
    {
        country: "Ecuador",
        tax_id: "ec_ruc",
        code: "EC",
    },
    {
        country: "Egypt",
        tax_id: "eg_tin",
        code: "EG",
    },
    {
        country: "El Salvador",
        tax_id: "sv_nit",
        code: "SV",
    },
    {
        country: "Estonia",
        tax_id: "eu_vat",
        code: "EE",
    },
    {
        country: "EU",
        tax_id: "eu_oss_vat",
        code: "EU",
    },
    {
        country: "Finland",
        tax_id: "eu_vat",
        code: "FI",
    },
    {
        country: "France",
        tax_id: "eu_vat",
        code: "FR",
    },
    {
        country: "Georgia",
        tax_id: "ge_vat",
        code: "GE",
    },
    {
        country: "Germany",
        tax_id: "eu_vat",
        code: "DE",
    },
    {
        country: "Greece",
        tax_id: "eu_vat",
        code: "EL",
    },
    {
        country: "Hong Kong",
        tax_id: "hk_br",
        code: "HK",
    },
    {
        country: "Hungary",
        tax_id: "eu_vat",
        code: "HU",
    },
    {
        country: "Hungary",
        tax_id: "hu_tin",
        code: "HU",
    },
    {
        country: "Iceland",
        tax_id: "is_vat",
        code: "IS",
    },
    {
        country: "India",
        tax_id: "in_gst",
        code: "IN",
    },
    {
        country: "Indonesia",
        tax_id: "id_npwp",
        code: "ID",
    },
    {
        country: "Ireland",
        tax_id: "eu_vat",
        code: "IE",
    },
    {
        country: "Israel",
        tax_id: "il_vat",
        code: "IL",
    },
    {
        country: "Italy",
        tax_id: "eu_vat",
        code: "IT",
    },
    {
        country: "Japan",
        tax_id: "jp_cn",
        code: "JP",
    },
    {
        country: "Japan",
        tax_id: "jp_rn",
        code: "JP",
    },
    {
        country: "Japan",
        tax_id: "jp_trn",
        code: "JP",
    },
    {
        country: "Kenya",
        tax_id: "ke_pin",
        code: "KE",
    },
    {
        country: "Latvia",
        tax_id: "eu_vat",
        code: "LV",
    },
    {
        country: "Liechtenstein",
        tax_id: "li_uid",
        code: "LI",
    },
    {
        country: "Lithuania",
        tax_id: "eu_vat",
        code: "LT",
    },
    {
        country: "Luxembourg",
        tax_id: "eu_vat",
        code: "LU",
    },
    {
        country: "Malaysia",
        tax_id: "my_frp",
        code: "MY",
    },
    {
        country: "Malaysia",
        tax_id: "my_itn",
        code: "MY",
    },
    {
        country: "Malaysia",
        tax_id: "my_sst",
        code: "MY",
    },
    {
        country: "Malta",
        tax_id: "eu_vat",
        code: "MT",
    },
    {
        country: "Mexico",
        tax_id: "mx_rfc",
        code: "MX",
    },
    {
        country: "Netherlands",
        tax_id: "eu_vat",
        code: "NL",
    },
    {
        country: "New Zealand",
        tax_id: "nz_gst",
        code: "NZ",
    },
    {
        country: "Norway",
        tax_id: "no_vat",
        code: "NO",
    },
    {
        country: "Peru",
        tax_id: "pe_ruc",
        code: "PE",
    },
    {
        country: "Philippines",
        tax_id: "ph_tin",
        code: "PH",
    },
    {
        country: "Poland",
        tax_id: "eu_vat",
        code: "PL",
    },
    {
        country: "Portugal",
        tax_id: "eu_vat",
        code: "PT",
    },
    {
        country: "Romania",
        tax_id: "eu_vat",
        code: "RO",
    },
    {
        country: "Romania",
        tax_id: "ro_tin",
        code: "RO",
    },
    {
        country: "Russia",
        tax_id: "ru_inn",
        code: "RU",
    },
    {
        country: "Russia",
        tax_id: "ru_kpp",
        code: "RU",
    },
    {
        country: "Saudi Arabia",
        tax_id: "sa_vat",
        code: "SA",
    },
    {
        country: "Serbia",
        tax_id: "rs_pib",
        code: "RS",
    },
    {
        country: "Singapore",
        tax_id: "sg_gst",
        code: "SG",
    },
    {
        country: "Singapore",
        tax_id: "sg_uen",
        code: "SG",
    },
    {
        country: "Slovakia",
        tax_id: "eu_vat",
        code: "SK",
    },
    {
        country: "Slovenia",
        tax_id: "eu_vat",
        code: "SI",
    },
    {
        country: "Slovenia",
        tax_id: "si_tin",
        code: "SI",
    },
    {
        country: "South Africa",
        tax_id: "za_vat",
        code: "ZA",
    },
    {
        country: "South Korea",
        tax_id: "kr_brn",
        code: "KR",
    },
    {
        country: "Spain",
        tax_id: "es_cif",
        code: "ES",
    },
    {
        country: "Spain",
        tax_id: "eu_vat",
        code: "ES",
    },
    {
        country: "Sweden",
        tax_id: "eu_vat",
        code: "SE",
    },
    {
        country: "Switzerland",
        tax_id: "ch_vat",
        code: "CH",
    },
    {
        country: "Taiwan",
        tax_id: "tw_vat",
        code: "TW",
    },
    {
        country: "Thailand",
        tax_id: "th_vat",
        code: "TH",
    },
    {
        country: "Turkey",
        tax_id: "tr_tin",
        code: "TR",
    },
    {
        country: "Ukraine",
        tax_id: "ua_vat",
        code: "UA",
    },
    {
        country: "United Arab Emirates",
        tax_id: "ae_trn",
        code: "AE",
    },
    {
        country: "United Kingdom",
        tax_id: "eu_vat",
        code: "GB",
    },
    {
        country: "United Kingdom",
        tax_id: "gb_vat",
        code: "GB",
    },
    {
        country: "United States",
        tax_id: "us_ein",
        code: "US",
    },
    {
        country: "Uruguay",
        tax_id: "uy_ruc",
        code: "UY",
    },
    {
        country: "Venezuela",
        tax_id: "ve_rif",
        code: "VE",
    },
    {
        country: "Vietnam",
        tax_id: "vn_tin",
        code: "VN",
    },
];

export default vatIdList;
