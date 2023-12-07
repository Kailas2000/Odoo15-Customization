# -*- coding: utf-8 -*-
{
    'name': 'Sales Person Filter',
    'version': '15.0.1.0.0',
    'author': "Kailas",
    'category': 'Category',
    'sequence': 15,
    'summary': 'Sales Person Filter in kanban view',
    'description': "",
    'depends': [
        'base',
        'crm',
    ],
    'data': [
        'view/kanban_extend.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'sales_person_filter/static/src/js/sales_person_filter.js',
        ],
        'web.assets_qweb': [
            'sales_person_filter/static/src/xml/sales_person_filter.xml',
        ],
    },
    'installable': True,
    'application': True,
    'license': 'LGPL-3',
}
