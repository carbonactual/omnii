const DOMAIN = (id, title, capabilities, priority = 'core') => Object.freeze({
  id,
  title,
  priority,
  capabilities: Object.freeze(capabilities),
});

export const EDUCATION_PROGRESSION_STAGES = Object.freeze([
  'early_childhood',
  'primary',
  'secondary',
  'post_secondary',
  'vocational_technical',
  'undergraduate',
  'postgraduate',
  'doctoral_research',
  'professional_entry',
  'workplace_learning',
  'professional_development',
  'career_transition',
  'entrepreneurial_learning',
  'community_learning',
  'lifelong_learning',
  'ai_agent_learning',
]);

export const EDUCATION_CAPABILITY_DOMAINS = Object.freeze([
  DOMAIN('discovery_guidance', 'Discovery, counselling and guidance', [
    'education_search', 'programme_compare', 'course_compare', 'career_exploration',
    'pathway_planning', 'eligibility_guidance', 'study_abroad_guidance', 'scholarship_discovery',
    'financial_options_guidance', 'career_counselling', 'education_counselling',
    'academic_advising', 'student_navigation', 'decision_support', 'parent_guardian_guidance',
  ]),
  DOMAIN('admissions_enrollment', 'Application, admissions and enrollment', [
    'prospect_capture', 'application_forms', 'document_intake', 'identity_verification',
    'credential_verification', 'eligibility_screening', 'application_completeness',
    'application_fraud_detection', 'application_review', 'shortlisting', 'admission_interview',
    'interview_scheduling', 'admission_decision', 'offer_management', 'acceptance',
    'registration', 'enrollment', 'matriculation', 'deferral', 'withdrawal', 'transfer',
    'readmission', 'recognition_of_prior_learning',
  ]),
  DOMAIN('curriculum_programme', 'Programme, curriculum and academic design', [
    'institution_model', 'programme_catalog', 'programme_design', 'curriculum_design',
    'curriculum_versioning', 'course_design', 'subject_mapping', 'learning_outcomes',
    'competency_mapping', 'standards_alignment', 'prerequisite_graphs', 'credit_structures',
    'course_equivalency', 'curriculum_gap_analysis', 'curriculum_quality_review',
  ]),
  DOMAIN('learning_delivery', 'Teaching, instruction and learning delivery', [
    'lesson_planning', 'content_authoring', 'adaptive_instruction', 'differentiation',
    'multimodal_learning', 'synchronous_learning', 'asynchronous_learning', 'cohort_learning',
    'project_based_learning', 'problem_based_learning', 'experiential_learning', 'field_learning',
    'laboratory_learning', 'workshop_learning', 'community_learning', 'microlearning',
    'self_directed_learning', 'mastery_learning', 'remediation', 'enrichment',
  ]),
  DOMAIN('tutoring_mentoring_coaching', 'Tutoring, mentoring and coaching', [
    'ai_tutor', 'human_tutor_matching', 'study_buddy', 'quiz_partner', 'writing_coach',
    'language_coach', 'coding_coach', 'exam_coach', 'peer_mentor', 'professional_mentor',
    'career_coach', 'executive_coach', 'research_mentor', 'teacher_coach', 'group_facilitation',
    'study_group_matching', 'mentor_matching', 'coach_matching',
  ]),
  DOMAIN('learning_support_accessibility', 'Inclusion, accessibility and learner support', [
    'accessibility_assessment', 'assistive_learning', 'screen_reader_support', 'speech_support',
    'read_aloud', 'captioning', 'translation', 'language_adaptation', 'dyslexia_support',
    'low_vision_support', 'hearing_support', 'neurodiversity_support', 'accommodation_workflow',
    'inclusive_content_adaptation', 'device_adaptive_learning', 'bandwidth_adaptive_learning',
    'offline_learning', 'local_language_learning',
  ]),
  DOMAIN('assessment_measurement', 'Assessment, examinations and measurement', [
    'diagnostic_assessment', 'formative_assessment', 'summative_assessment', 'placement_testing',
    'entrance_exam', 'course_exam', 'professional_exam', 'qualifying_exam', 'promotion_exam',
    'confirmation_exam', 'practical_exam', 'oral_exam', 'viva', 'portfolio_assessment',
    'competency_assessment', 'simulation_assessment', 'performance_assessment', 'interview_assessment',
    'mock_exam', 'ai_assessment', 'test_blueprinting', 'item_authoring', 'item_banking',
    'adaptive_testing', 'standard_setting', 'score_reporting', 'measurement_analysis',
  ]),
  DOMAIN('assessment_integrity', 'Invigilation, proctoring and integrity', [
    'candidate_authentication', 'remote_proctoring', 'live_invigilation', 'recorded_invigilation',
    'browser_controls', 'device_integrity', 'environment_checks', 'identity_match',
    'suspicious_event_detection', 'assessment_event_timeline', 'human_review', 'malpractice_case',
    'appeal', 'remarking', 'regrading', 'retest', 'authorship_evidence', 'process_evidence',
    'ai_use_declaration', 'ai_assistance_policy', 'integrity_analytics',
  ]),
  DOMAIN('marking_feedback', 'Marking, grading and feedback', [
    'automated_marking', 'rubric_scoring', 'assisted_marking', 'essay_feedback', 'code_feedback',
    'oral_feedback', 'written_feedback', 'audio_feedback', 'video_feedback', 'peer_review',
    'moderation', 'second_marker', 'grade_normalization', 'grade_boundary_review',
    'personalized_feedback', 'feedback_quality_audit',
  ]),
  DOMAIN('learner_success', 'Student success, retention and progression', [
    'engagement_tracking', 'learning_analytics', 'early_warning', 'risk_detection',
    'persistence_support', 'retention_campaigns', 'case_management', 'student_outreach',
    'holds_resolution', 'attendance_intervention', 'academic_recovery', 'progress_monitoring',
    'completion_planning', 'graduation_readiness', 're_enrollment_support', 'student_voice',
  ]),
  DOMAIN('student_wellbeing_counselling', 'Wellbeing, counselling and safeguarding', [
    'wellbeing_check_in', 'student_support_navigation', 'counselling_referral', 'crisis_escalation',
    'safeguarding_workflow', 'mental_health_resource_navigation', 'social_emotional_learning',
    'belonging_support', 'peer_support', 'family_support', 'substance_risk_education',
    'safety_reporting', 'human_counsellor_handoff',
  ]),
  DOMAIN('academic_administration', 'Academic administration and records', [
    'attendance', 'class_rosters', 'faculty_assignment', 'course_registration', 'gradebook',
    'transcripts', 'degree_audit', 'academic_progress', 'timetable', 'exam_schedule',
    'room_allocation', 'resource_booking', 'academic_calendar', 'leave_of_absence',
    'transfer_credit', 'graduation_processing', 'records_requests', 'document_generation',
  ]),
  DOMAIN('institution_operations', 'Institution, staff and operational administration', [
    'faculty_workload', 'staff_onboarding', 'staff_training', 'professional_development',
    'policy_management', 'workflow_automation', 'communications', 'meeting_support',
    'procurement_support', 'budget_planning', 'grant_support', 'quality_assurance',
    'accreditation_preparation', 'compliance_tracking', 'institutional_reporting',
    'service_desk', 'knowledge_base', 'change_management',
  ]),
  DOMAIN('learning_resources_library', 'Resources, libraries and knowledge services', [
    'resource_discovery', 'library_search', 'literature_discovery', 'reading_guides',
    'source_evaluation', 'citation_support', 'research_questions', 'research_synthesis',
    'knowledge_graphs', 'open_educational_resources', 'content_rights_metadata',
    'content_recommendation', 'personal_knowledge_base', 'course_resource_curation',
  ]),
  DOMAIN('research_innovation', 'Research, scholarship and innovation', [
    'research_training', 'methodology_coaching', 'literature_review_support', 'data_analysis_support',
    'research_design', 'study_protocol_support', 'ethics_application_support', 'grant_writing_support',
    'research_project_management', 'collaboration_matching', 'lab_notebook_support',
    'reproducibility_support', 'research_output_management', 'innovation_challenges',
  ]),
  DOMAIN('experience_work_integrated', 'Internship, apprenticeship, SIWES and work-integrated learning', [
    'placement_discovery', 'opportunity_matching', 'internship_application', 'apprenticeship_matching',
    'siwes_management', 'work_based_learning', 'supervisor_assignment', 'experience_logging',
    'workplace_assessment', 'host_feedback', 'portfolio_evidence', 'workplace_learning_outcomes',
    'placement_compliance', 'placement_safety',
  ]),
  DOMAIN('credentials_progression', 'Credentials, recognition and progression', [
    'microcredentials', 'badges', 'certificates', 'diplomas', 'degrees', 'professional_credentials',
    'credential_references', 'credential_verification', 'digital_transcripts', 'learning_records',
    'competency_records', 'credit_transfer', 'stackable_credentials', 'pathway_completion',
    'recertification', 'renewal', 'recognition_of_prior_learning',
  ]),
  DOMAIN('career_workforce_transition', 'Career, employability and workforce transition', [
    'career_exploration', 'skills_gap_analysis', 'career_pathway_planning', 'job_readiness',
    'portfolio_building', 'cv_support', 'interview_practice', 'employability_training',
    'opportunity_matching', 'skills_to_job_mapping', 'career_transition', 'reskilling',
    'upskilling', 'entrepreneurship_learning', 'workforce_learning',
  ]),
  DOMAIN('continuing_professional_learning', 'Continuing education and professional development', [
    'cpd_planning', 'mandatory_training', 'competence_maintenance', 'specialization',
    'professional_update', 'recertification_preparation', 'professional_supervision',
    'practice_reflection', 'professional_peer_learning',
  ]),
  DOMAIN('entity_and_enterprise_learning', 'Organizational and enterprise learning', [
    'organizational_capability_mapping', 'role_based_learning', 'mandatory_compliance_training',
    'new_hire_learning', 'leadership_development', 'technical_training', 'knowledge_transfer',
    'succession_learning', 'enterprise_academy', 'supplier_training', 'customer_training',
  ]),
  DOMAIN('government_systems', 'Government, ministry and national education systems', [
    'national_learning_strategy', 'education_policy_support', 'education_system_mapping',
    'school_registry_projection', 'teacher_registry_projection', 'learner_registry_projection',
    'curriculum_monitoring', 'national_assessment_support', 'workforce_skills_dashboard',
    'funding_programme_tracking', 'education_equity_monitoring', 'capacity_planning',
    'system_performance_analytics', 'policy_simulation', 'programme_evaluation',
  ]),
  DOMAIN('family_community_learning', 'Family, community and social learning', [
    'parent_learning', 'caregiver_guidance', 'home_learning', 'homeschooling_support',
    'community_tutoring', 'community_mentorship', 'peer_learning', 'adult_basic_education',
    'civic_learning', 'financial_literacy', 'digital_literacy',
  ]),
  DOMAIN('ai_as_learner', 'AI/agent education and capability development', [
    'ai_identity_context', 'knowledge_package_assignment', 'ai_study_plan', 'agent_practice',
    'agent_simulation', 'agent_benchmarking', 'agent_capability_assessment', 'evaluation_dataset_training',
    'tool_use_training', 'safety_training', 'human_supervision_training', 'capability_versioning',
    'deployment_readiness', 'post_deployment_learning', 'retirement_and_retraining',
  ], 'emerging'),
  DOMAIN('education_ai_governance', 'AI governance, assurance and institutional trust', [
    'ai_use_policy', 'model_inventory', 'vendor_assurance', 'privacy_assurance', 'age_appropriate_controls',
    'bias_testing', 'fairness_review', 'explainability', 'human_oversight', 'audit_trails',
    'model_evaluation', 'outcome_evaluation', 'incident_response', 'red_teaming', 'procurement_guardrails',
    'environmental_impact_tracking', 'data_governance', 'consent_management',
  ]),
  DOMAIN('interoperability_mobility', 'Interoperability and learner mobility', [
    'sso', 'roster_exchange', 'course_exchange', 'assessment_exchange', 'competency_exchange',
    'learning_record_exchange', 'credential_exchange', 'portable_transcript', 'portable_profile',
    'institution_to_institution_transfer', 'cross_border_learning', 'migration_of_learning_records',
    'api_integrations', 'lti_integrations', 'standards_adapters',
  ]),
  DOMAIN('education_economy_access', 'Funding, affordability and education economy', [
    'fee_estimation', 'payment_plans', 'scholarship_matching', 'grant_matching', 'bursary_support',
    'student_aid_navigation', 'sponsorship', 'employer_funded_learning', 'learning_credit',
    'education_market_discovery', 'training_procurement', 'institutional_billing_support',
  ]),
  DOMAIN('future_frontier', 'Future and emerging education', [
    'agentic_university_operations', 'ai_native_curriculum', 'continuous_assessment',
    'simulation_first_learning', 'digital_twins_for_learning', 'immersive_learning',
    'robotics_learning', 'spatial_computing_learning', 'synthetic_practice_environments',
    'personal_learning_worlds', 'lifelong_learning_agents', 'machine_readable_competencies',
    'real_time_skill_signals', 'learning_to_work_automation', 'adaptive_national_learning_systems',
    'human_ai_co_learning', 'human_ai_team_formation',
  ], 'emerging'),
]);

export function findEducationCapabilities(capability) {
  const key = String(capability).trim();
  if (!key) return [];
  return EDUCATION_CAPABILITY_DOMAINS.filter((domain) => domain.capabilities.includes(key));
}

export function getEducationDomain(domainId) {
  return EDUCATION_CAPABILITY_DOMAINS.find((domain) => domain.id === domainId) ?? null;
}
