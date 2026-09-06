const FREEZE = (value) => Object.freeze(value);

export const INSTITUTEGPT_PRODUCTS = FREEZE({
  OPEN_ED_BOT: FREEZE({
    productKey: 'OPEN_ED_BOT',
    productName: 'OpenEd Bot',
    parent: 'INSTITUTEGPT',
    role: 'global_open_education_composition',
    purpose: 'Open, interoperable education operating assistant spanning the global open, distance, flexible, online and lifelong education value chain.',
    deploymentModel: 'institution_configurable',
    standardsAdapters: FREEZE(['UNESCO_OER', '1EDTECH_LTI', '1EDTECH_EDU_API', '1EDTECH_ONEROSTER', '1EDTECH_QTI', '1EDTECH_CASE', '1EDTECH_CALIPER', '1EDTECH_CLR', '1EDTECH_OPEN_BADGES', 'W3C_VC_2_0', 'LOCAL_AUTHORITY_FRAMEWORKS']),
    capabilities: FREEZE([
      'open_education_discovery', 'oer_discovery', 'oer_creation', 'oer_adaptation', 'oer_remix',
      'oer_curation', 'open_licensing_guidance', 'open_pedagogy', 'open_course_design',
      'open_university_operations', 'odl_programme_design', 'odl_course_design', 'learner_support',
      'admissions', 'enrollment', 'orientation', 'academic_advising', 'ai_tutoring', 'mentoring',
      'assessment', 'authentic_assessment', 'proctoring', 'invigilation', 'marking', 'moderation',
      'student_success', 'research_support', 'library_support', 'accessibility', 'multilingual_learning',
      'low_bandwidth_learning', 'offline_learning', 'microcredentials', 'portable_learner_records',
      'credential_verification', 'credit_transfer', 'lifelong_learning', 'work_integrated_learning',
      'institutional_analytics', 'quality_assurance', 'accreditation_support', 'ai_governance',
      'education_policy_support', 'cross_institution_mobility', 'cross_border_learning', 'examination_services'
    ]),
  }),
  NOTEBOOK: FREEZE({
    productKey: 'NOTEBOOK',
    productName: 'InstituteGPT Notebook',
    parent: 'INSTITUTEGPT',
    role: 'learning_research_teaching_workspace',
    purpose: 'AI-native, portable workspace for learning, teaching, research, reflection, projects, fieldwork, portfolios and evidence.',
    deploymentModel: 'universal',
    capabilities: FREEZE([
      'learning_notes', 'course_notebook', 'research_notebook', 'teaching_notebook', 'field_notebook',
      'lab_notebook', 'project_workspace', 'reading_notes', 'source_linking', 'citation_support',
      'ai_tutor_context', 'study_planning', 'question_generation', 'practice_workspace', 'reflection_log',
      'portfolio_evidence', 'supervisor_feedback', 'peer_collaboration', 'study_group_workspace',
      'multimodal_capture', 'voice_notes', 'offline_capture', 'version_history', 'provenance',
      'knowledge_graph_links', 'competency_mapping', 'assessment_evidence', 'exportable_learning_record'
    ]),
  }),
  EXAMS: FREEZE({
    productKey: 'EXAMS',
    productName: 'InstituteGPT Exams',
    parent: 'INSTITUTEGPT',
    role: 'examination_and_testing_product',
    purpose: 'Universal examination operating product for national, institutional, admissions, professional, licensing-support, language, workplace, promotion, certification and competitive examinations.',
    deploymentModel: 'provider_and_institution_configurable',
    capabilities: FREEZE([
      'exam_discovery', 'eligibility', 'registration', 'identity_verification', 'evidence_intake',
      'exam_scheduling', 'test_centre_allocation', 'remote_test_setup', 'candidate_preparation',
      'question_banking', 'test_blueprinting', 'adaptive_testing', 'computer_based_testing',
      'paper_based_testing', 'hybrid_testing', 'practical_testing', 'oral_testing', 'viva',
      'simulation_testing', 'candidate_authentication', 'invigilation', 'proctoring',
      'device_integrity', 'environment_checks', 'event_capture', 'response_capture',
      'automated_marking', 'assisted_marking', 'rubric_scoring', 'human_marking', 'second_marking',
      'moderation', 'standard_setting', 'scoring', 'quality_assurance', 'result_publication',
      'result_verification', 'appeal', 'remarking', 'regrading', 'retake', 'credential_reference',
      'admission_decision_support', 'professional_progression_support', 'employment_selection_support',
      'assessment_integrity_analytics', 'exam_security', 'exam_centre_operations', 'examiner_management',
      'exam_content_versioning', 'qti_interoperability', 'portable_results'
    ]),
  }),
  INSTITUTION_DEPLOYMENT: FREEZE({
    productKey: 'INSTITUTION_DEPLOYMENT',
    productName: 'OpenEd Institution Deployment',
    parent: 'OPEN_ED_BOT',
    role: 'tailored_institutional_configuration',
    purpose: 'Configure OpenEd Bot for a specific open or distance tertiary institution without creating a new education architecture.',
    deploymentModel: 'profile_and_policy_configuration',
    configurationDimensions: FREEZE([
      'institution_identity', 'authority_and_regulator_refs', 'academic_calendar', 'admission_rules',
      'programme_catalog', 'curricula', 'course_catalog', 'credit_system', 'tuition_and_aid',
      'learner_support_model', 'study_centres', 'faculty_structure', 'assessment_rules',
      'examination_schedule', 'proctoring_policy', 'grading_scheme', 'credential_rules',
      'quality_assurance', 'accreditation_requirements', 'local_language', 'regional_context',
      'institutional_ai_policy', 'data_retention', 'privacy_and_consent', 'workflow_roles',
      'integrations', 'branding', 'communications', 'institutional_analytics'
    ]),
  }),
});

export const OPEN_ED_DEPLOYMENT_PROFILES = FREEZE({
  NOUN_BOT: FREEZE({
    productKey: 'NOUN_BOT',
    parentProduct: 'OPEN_ED_BOT',
    deploymentType: 'institution_profile',
    institution: 'National Open University of Nigeria',
    country: 'NG',
    status: 'tailored_deployment',
    inheritance: FREEZE(['OPEN_ED_BOT', 'INSTITUTEGPT']),
    localConfiguration: FREEZE(['NOUN_admission_rules', 'NOUN_programmes', 'NOUN_curricula', 'NOUN_academic_calendar', 'NOUN_study_centres', 'NOUN_assessment_rules', 'NOUN_learner_support', 'NOUN_quality_assurance', 'NOUN_authority_refs']),
  }),
});

export function getInstituteGPTProduct(productKey) {
  return INSTITUTEGPT_PRODUCTS[productKey] ?? null;
}

export function getOpenEdDeployment(deploymentKey) {
  return OPEN_ED_DEPLOYMENT_PROFILES[deploymentKey] ?? null;
}

export function resolveOpenEdDeployment(deploymentKey) {
  const deployment = getOpenEdDeployment(deploymentKey);
  if (!deployment) return null;
  return {
    ...deployment,
    canonicalProduct: getInstituteGPTProduct('OPEN_ED_BOT'),
    notebook: getInstituteGPTProduct('NOTEBOOK'),
    exams: getInstituteGPTProduct('EXAMS'),
  };
}
