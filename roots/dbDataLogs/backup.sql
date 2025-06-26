--
-- PostgreSQL database dump
--

-- Dumped from database version 14.15 (Homebrew)
-- Dumped by pg_dump version 14.15 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: FinancialMetrics; Type: TABLE; Schema: public; Owner: c137
--

CREATE TABLE public."FinancialMetrics" (
    id integer NOT NULL,
    net_income numeric,
    lifestyle_spend numeric,
    investment_savings numeric,
    cumulative_assets numeric,
    debt_remaining numeric,
    emergency_fund numeric,
    liquidity_percent numeric,
    wealth_to_liability_ratio character varying(255),
    lifestyle_inflation_percent numeric,
    tax_savings numeric,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer,
    "timePeriodId" integer
);


ALTER TABLE public."FinancialMetrics" OWNER TO c137;

--
-- Name: FinancialMetrics_id_seq; Type: SEQUENCE; Schema: public; Owner: c137
--

CREATE SEQUENCE public."FinancialMetrics_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."FinancialMetrics_id_seq" OWNER TO c137;

--
-- Name: FinancialMetrics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: c137
--

ALTER SEQUENCE public."FinancialMetrics_id_seq" OWNED BY public."FinancialMetrics".id;


--
-- Name: TimePeriods; Type: TABLE; Schema: public; Owner: c137
--

CREATE TABLE public."TimePeriods" (
    id integer NOT NULL,
    period_label character varying(255),
    start_date date,
    end_date date,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer
);


ALTER TABLE public."TimePeriods" OWNER TO c137;

--
-- Name: TimePeriods_id_seq; Type: SEQUENCE; Schema: public; Owner: c137
--

CREATE SEQUENCE public."TimePeriods_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."TimePeriods_id_seq" OWNER TO c137;

--
-- Name: TimePeriods_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: c137
--

ALTER SEQUENCE public."TimePeriods_id_seq" OWNED BY public."TimePeriods".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: c137
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    username character varying(255),
    email character varying(255),
    password character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO c137;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: c137
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO c137;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: c137
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: assetportfoliometrics; Type: TABLE; Schema: public; Owner: c137
--

CREATE TABLE public.assetportfoliometrics (
    metric_id bigint NOT NULL,
    user_id bigint NOT NULL,
    time_period_id bigint NOT NULL,
    equity_percent numeric(5,2) DEFAULT 0.00,
    debt_percent numeric(5,2) DEFAULT 0.00,
    gold_percent numeric(5,2) DEFAULT 0.00,
    cash_liquid_percent numeric(5,2) DEFAULT 0.00,
    real_estate_percent numeric(5,2) DEFAULT 0.00,
    crypto_percent numeric(5,2) DEFAULT 0.00,
    projected_cagr_percent numeric(5,2) DEFAULT 0.00,
    volatility_risk_score integer,
    concentration_risk_score integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT assetportfoliometrics_concentration_risk_score_check CHECK (((concentration_risk_score >= 1) AND (concentration_risk_score <= 10))),
    CONSTRAINT assetportfoliometrics_volatility_risk_score_check CHECK (((volatility_risk_score >= 1) AND (volatility_risk_score <= 10)))
);


ALTER TABLE public.assetportfoliometrics OWNER TO c137;

--
-- Name: assetportfoliometrics_metric_id_seq; Type: SEQUENCE; Schema: public; Owner: c137
--

CREATE SEQUENCE public.assetportfoliometrics_metric_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.assetportfoliometrics_metric_id_seq OWNER TO c137;

--
-- Name: assetportfoliometrics_metric_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: c137
--

ALTER SEQUENCE public.assetportfoliometrics_metric_id_seq OWNED BY public.assetportfoliometrics.metric_id;


--
-- Name: feedbackhistory; Type: TABLE; Schema: public; Owner: c137
--

CREATE TABLE public.feedbackhistory (
    feedback_id bigint NOT NULL,
    user_id bigint NOT NULL,
    time_period_id bigint NOT NULL,
    metric_type character varying(50) NOT NULL,
    associated_metric_id bigint NOT NULL,
    feedback_source character varying(50) DEFAULT 'user'::character varying NOT NULL,
    feedback_score integer,
    feedback_text text,
    action_taken text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT feedbackhistory_feedback_score_check CHECK (((feedback_score >= '-10'::integer) AND (feedback_score <= 10))),
    CONSTRAINT feedbackhistory_metric_type_check CHECK (((metric_type)::text = ANY ((ARRAY['Financial'::character varying, 'PsychoBehavioral'::character varying, 'Lifestyle'::character varying, 'AssetPortfolio'::character varying, 'GoalsAndMastery'::character varying])::text[])))
);


ALTER TABLE public.feedbackhistory OWNER TO c137;

--
-- Name: feedbackhistory_feedback_id_seq; Type: SEQUENCE; Schema: public; Owner: c137
--

CREATE SEQUENCE public.feedbackhistory_feedback_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feedbackhistory_feedback_id_seq OWNER TO c137;

--
-- Name: feedbackhistory_feedback_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: c137
--

ALTER SEQUENCE public.feedbackhistory_feedback_id_seq OWNED BY public.feedbackhistory.feedback_id;


--
-- Name: financialmetrics; Type: TABLE; Schema: public; Owner: c137
--

CREATE TABLE public.financialmetrics (
    metric_id bigint NOT NULL,
    user_id bigint NOT NULL,
    time_period_id bigint NOT NULL,
    net_income numeric(15,2) DEFAULT 0.00,
    lifestyle_spend numeric(15,2) DEFAULT 0.00,
    investment_savings numeric(15,2) DEFAULT 0.00,
    cumulative_assets numeric(15,2) DEFAULT 0.00,
    debt_remaining numeric(15,2) DEFAULT 0.00,
    emergency_fund_months numeric(5,2) DEFAULT 0.00,
    liquidity_percent numeric(5,2) DEFAULT 0.00,
    wealth_to_liability_ratio numeric(10,4),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.financialmetrics OWNER TO c137;

--
-- Name: financialmetrics_metric_id_seq; Type: SEQUENCE; Schema: public; Owner: c137
--

CREATE SEQUENCE public.financialmetrics_metric_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.financialmetrics_metric_id_seq OWNER TO c137;

--
-- Name: financialmetrics_metric_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: c137
--

ALTER SEQUENCE public.financialmetrics_metric_id_seq OWNED BY public.financialmetrics.metric_id;


--
-- Name: goalsandmastery; Type: TABLE; Schema: public; Owner: c137
--

CREATE TABLE public.goalsandmastery (
    goal_id bigint NOT NULL,
    user_id bigint NOT NULL,
    time_period_id bigint NOT NULL,
    goal_title character varying(255) NOT NULL,
    goal_description text,
    goal_category character varying(100),
    status character varying(50) DEFAULT 'not_started'::character varying NOT NULL,
    target_date date,
    completion_date date,
    progress_percent numeric(5,2) DEFAULT 0.00,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT goalsandmastery_progress_percent_check CHECK (((progress_percent >= 0.00) AND (progress_percent <= 100.00))),
    CONSTRAINT goalsandmastery_status_check CHECK (((status)::text = ANY ((ARRAY['not_started'::character varying, 'in_progress'::character varying, 'achieved'::character varying, 'abandoned'::character varying])::text[])))
);


ALTER TABLE public.goalsandmastery OWNER TO c137;

--
-- Name: goalsandmastery_goal_id_seq; Type: SEQUENCE; Schema: public; Owner: c137
--

CREATE SEQUENCE public.goalsandmastery_goal_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.goalsandmastery_goal_id_seq OWNER TO c137;

--
-- Name: goalsandmastery_goal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: c137
--

ALTER SEQUENCE public.goalsandmastery_goal_id_seq OWNED BY public.goalsandmastery.goal_id;


--
-- Name: lifestylemetrics; Type: TABLE; Schema: public; Owner: c137
--

CREATE TABLE public.lifestylemetrics (
    metric_id bigint NOT NULL,
    user_id bigint NOT NULL,
    time_period_id bigint NOT NULL,
    relationship_readiness_score integer,
    work_life_balance_score integer,
    burnout_risk_percent numeric(5,2) DEFAULT 0.00,
    notes text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT lifestylemetrics_relationship_readiness_score_check CHECK (((relationship_readiness_score >= 1) AND (relationship_readiness_score <= 10))),
    CONSTRAINT lifestylemetrics_work_life_balance_score_check CHECK (((work_life_balance_score >= 1) AND (work_life_balance_score <= 10)))
);


ALTER TABLE public.lifestylemetrics OWNER TO c137;

--
-- Name: lifestylemetrics_metric_id_seq; Type: SEQUENCE; Schema: public; Owner: c137
--

CREATE SEQUENCE public.lifestylemetrics_metric_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lifestylemetrics_metric_id_seq OWNER TO c137;

--
-- Name: lifestylemetrics_metric_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: c137
--

ALTER SEQUENCE public.lifestylemetrics_metric_id_seq OWNED BY public.lifestylemetrics.metric_id;


--
-- Name: permissions; Type: TABLE; Schema: public; Owner: c137
--

CREATE TABLE public.permissions (
    permission_id integer NOT NULL,
    permission_name character varying(100) NOT NULL,
    description text
);


ALTER TABLE public.permissions OWNER TO c137;

--
-- Name: permissions_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: c137
--

CREATE SEQUENCE public.permissions_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.permissions_permission_id_seq OWNER TO c137;

--
-- Name: permissions_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: c137
--

ALTER SEQUENCE public.permissions_permission_id_seq OWNED BY public.permissions.permission_id;


--
-- Name: psychobehavioralmetrics; Type: TABLE; Schema: public; Owner: c137
--

CREATE TABLE public.psychobehavioralmetrics (
    metric_id bigint NOT NULL,
    user_id bigint NOT NULL,
    time_period_id bigint NOT NULL,
    psychological_state_score integer,
    behavioral_risk_score integer,
    self_awareness_score integer,
    discipline_confidence_score integer,
    sentiment_summary text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT psychobehavioralmetrics_behavioral_risk_score_check CHECK (((behavioral_risk_score >= 1) AND (behavioral_risk_score <= 10))),
    CONSTRAINT psychobehavioralmetrics_discipline_confidence_score_check CHECK (((discipline_confidence_score >= 1) AND (discipline_confidence_score <= 10))),
    CONSTRAINT psychobehavioralmetrics_psychological_state_score_check CHECK (((psychological_state_score >= 1) AND (psychological_state_score <= 10))),
    CONSTRAINT psychobehavioralmetrics_self_awareness_score_check CHECK (((self_awareness_score >= 1) AND (self_awareness_score <= 10)))
);


ALTER TABLE public.psychobehavioralmetrics OWNER TO c137;

--
-- Name: psychobehavioralmetrics_metric_id_seq; Type: SEQUENCE; Schema: public; Owner: c137
--

CREATE SEQUENCE public.psychobehavioralmetrics_metric_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.psychobehavioralmetrics_metric_id_seq OWNER TO c137;

--
-- Name: psychobehavioralmetrics_metric_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: c137
--

ALTER SEQUENCE public.psychobehavioralmetrics_metric_id_seq OWNED BY public.psychobehavioralmetrics.metric_id;


--
-- Name: rolepermissions; Type: TABLE; Schema: public; Owner: c137
--

CREATE TABLE public.rolepermissions (
    role_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.rolepermissions OWNER TO c137;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: c137
--

CREATE TABLE public.roles (
    role_id integer NOT NULL,
    role_name character varying(50) NOT NULL
);


ALTER TABLE public.roles OWNER TO c137;

--
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: c137
--

CREATE SEQUENCE public.roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_role_id_seq OWNER TO c137;

--
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: c137
--

ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;


--
-- Name: timeperiods; Type: TABLE; Schema: public; Owner: c137
--

CREATE TABLE public.timeperiods (
    time_period_id bigint NOT NULL,
    user_id bigint NOT NULL,
    period_label character varying(100) NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT timeperiods_check CHECK ((start_date <= end_date))
);


ALTER TABLE public.timeperiods OWNER TO c137;

--
-- Name: timeperiods_time_period_id_seq; Type: SEQUENCE; Schema: public; Owner: c137
--

CREATE SEQUENCE public.timeperiods_time_period_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.timeperiods_time_period_id_seq OWNER TO c137;

--
-- Name: timeperiods_time_period_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: c137
--

ALTER SEQUENCE public.timeperiods_time_period_id_seq OWNED BY public.timeperiods.time_period_id;


--
-- Name: userroles; Type: TABLE; Schema: public; Owner: c137
--

CREATE TABLE public.userroles (
    user_id bigint NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.userroles OWNER TO c137;

--
-- Name: users; Type: TABLE; Schema: public; Owner: c137
--

CREATE TABLE public.users (
    user_id bigint NOT NULL,
    username character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    hashed_password text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO c137;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: c137
--

CREATE SEQUENCE public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO c137;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: c137
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: v_usergrowthsummary; Type: VIEW; Schema: public; Owner: c137
--

CREATE VIEW public.v_usergrowthsummary AS
 SELECT u.user_id,
    u.username,
    tp.time_period_id,
    tp.period_label,
    tp.start_date,
    tp.end_date,
    fm.net_income,
    fm.cumulative_assets,
    fm.debt_remaining,
    pbm.psychological_state_score,
    pbm.discipline_confidence_score,
    lsm.work_life_balance_score,
    apm.projected_cagr_percent,
    apm.volatility_risk_score
   FROM (((((public.users u
     JOIN public.timeperiods tp ON ((u.user_id = tp.user_id)))
     LEFT JOIN public.financialmetrics fm ON ((tp.time_period_id = fm.time_period_id)))
     LEFT JOIN public.psychobehavioralmetrics pbm ON ((tp.time_period_id = pbm.time_period_id)))
     LEFT JOIN public.lifestylemetrics lsm ON ((tp.time_period_id = lsm.time_period_id)))
     LEFT JOIN public.assetportfoliometrics apm ON ((tp.time_period_id = apm.time_period_id)));


ALTER TABLE public.v_usergrowthsummary OWNER TO c137;

--
-- Name: FinancialMetrics id; Type: DEFAULT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public."FinancialMetrics" ALTER COLUMN id SET DEFAULT nextval('public."FinancialMetrics_id_seq"'::regclass);


--
-- Name: TimePeriods id; Type: DEFAULT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public."TimePeriods" ALTER COLUMN id SET DEFAULT nextval('public."TimePeriods_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Name: assetportfoliometrics metric_id; Type: DEFAULT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.assetportfoliometrics ALTER COLUMN metric_id SET DEFAULT nextval('public.assetportfoliometrics_metric_id_seq'::regclass);


--
-- Name: feedbackhistory feedback_id; Type: DEFAULT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.feedbackhistory ALTER COLUMN feedback_id SET DEFAULT nextval('public.feedbackhistory_feedback_id_seq'::regclass);


--
-- Name: financialmetrics metric_id; Type: DEFAULT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.financialmetrics ALTER COLUMN metric_id SET DEFAULT nextval('public.financialmetrics_metric_id_seq'::regclass);


--
-- Name: goalsandmastery goal_id; Type: DEFAULT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.goalsandmastery ALTER COLUMN goal_id SET DEFAULT nextval('public.goalsandmastery_goal_id_seq'::regclass);


--
-- Name: lifestylemetrics metric_id; Type: DEFAULT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.lifestylemetrics ALTER COLUMN metric_id SET DEFAULT nextval('public.lifestylemetrics_metric_id_seq'::regclass);


--
-- Name: permissions permission_id; Type: DEFAULT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.permissions ALTER COLUMN permission_id SET DEFAULT nextval('public.permissions_permission_id_seq'::regclass);


--
-- Name: psychobehavioralmetrics metric_id; Type: DEFAULT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.psychobehavioralmetrics ALTER COLUMN metric_id SET DEFAULT nextval('public.psychobehavioralmetrics_metric_id_seq'::regclass);


--
-- Name: roles role_id; Type: DEFAULT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);


--
-- Name: timeperiods time_period_id; Type: DEFAULT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.timeperiods ALTER COLUMN time_period_id SET DEFAULT nextval('public.timeperiods_time_period_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: FinancialMetrics; Type: TABLE DATA; Schema: public; Owner: c137
--

COPY public."FinancialMetrics" (id, net_income, lifestyle_spend, investment_savings, cumulative_assets, debt_remaining, emergency_fund, liquidity_percent, wealth_to_liability_ratio, lifestyle_inflation_percent, tax_savings, "createdAt", "updatedAt", "userId", "timePeriodId") FROM stdin;
\.


--
-- Data for Name: TimePeriods; Type: TABLE DATA; Schema: public; Owner: c137
--

COPY public."TimePeriods" (id, period_label, start_date, end_date, "createdAt", "updatedAt", "userId") FROM stdin;
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: c137
--

COPY public."Users" (id, username, email, password, "createdAt", "updatedAt") FROM stdin;
1	john_doe	john@example.com	$2b$10$oCykQ3wra/mUembsGXN0I.uZMIzXlc8WowvfBmlrGxdXbNAoYzxr.	2025-06-26 19:40:17.058+05:30	2025-06-26 19:40:17.058+05:30
\.


--
-- Data for Name: assetportfoliometrics; Type: TABLE DATA; Schema: public; Owner: c137
--

COPY public.assetportfoliometrics (metric_id, user_id, time_period_id, equity_percent, debt_percent, gold_percent, cash_liquid_percent, real_estate_percent, crypto_percent, projected_cagr_percent, volatility_risk_score, concentration_risk_score, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: feedbackhistory; Type: TABLE DATA; Schema: public; Owner: c137
--

COPY public.feedbackhistory (feedback_id, user_id, time_period_id, metric_type, associated_metric_id, feedback_source, feedback_score, feedback_text, action_taken, created_at) FROM stdin;
\.


--
-- Data for Name: financialmetrics; Type: TABLE DATA; Schema: public; Owner: c137
--

COPY public.financialmetrics (metric_id, user_id, time_period_id, net_income, lifestyle_spend, investment_savings, cumulative_assets, debt_remaining, emergency_fund_months, liquidity_percent, wealth_to_liability_ratio, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: goalsandmastery; Type: TABLE DATA; Schema: public; Owner: c137
--

COPY public.goalsandmastery (goal_id, user_id, time_period_id, goal_title, goal_description, goal_category, status, target_date, completion_date, progress_percent, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: lifestylemetrics; Type: TABLE DATA; Schema: public; Owner: c137
--

COPY public.lifestylemetrics (metric_id, user_id, time_period_id, relationship_readiness_score, work_life_balance_score, burnout_risk_percent, notes, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: c137
--

COPY public.permissions (permission_id, permission_name, description) FROM stdin;
\.


--
-- Data for Name: psychobehavioralmetrics; Type: TABLE DATA; Schema: public; Owner: c137
--

COPY public.psychobehavioralmetrics (metric_id, user_id, time_period_id, psychological_state_score, behavioral_risk_score, self_awareness_score, discipline_confidence_score, sentiment_summary, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: rolepermissions; Type: TABLE DATA; Schema: public; Owner: c137
--

COPY public.rolepermissions (role_id, permission_id) FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: c137
--

COPY public.roles (role_id, role_name) FROM stdin;
\.


--
-- Data for Name: timeperiods; Type: TABLE DATA; Schema: public; Owner: c137
--

COPY public.timeperiods (time_period_id, user_id, period_label, start_date, end_date, created_at) FROM stdin;
\.


--
-- Data for Name: userroles; Type: TABLE DATA; Schema: public; Owner: c137
--

COPY public.userroles (user_id, role_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: c137
--

COPY public.users (user_id, username, email, hashed_password, created_at, updated_at) FROM stdin;
\.


--
-- Name: FinancialMetrics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: c137
--

SELECT pg_catalog.setval('public."FinancialMetrics_id_seq"', 1, false);


--
-- Name: TimePeriods_id_seq; Type: SEQUENCE SET; Schema: public; Owner: c137
--

SELECT pg_catalog.setval('public."TimePeriods_id_seq"', 1, false);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: c137
--

SELECT pg_catalog.setval('public."Users_id_seq"', 1, true);


--
-- Name: assetportfoliometrics_metric_id_seq; Type: SEQUENCE SET; Schema: public; Owner: c137
--

SELECT pg_catalog.setval('public.assetportfoliometrics_metric_id_seq', 1, false);


--
-- Name: feedbackhistory_feedback_id_seq; Type: SEQUENCE SET; Schema: public; Owner: c137
--

SELECT pg_catalog.setval('public.feedbackhistory_feedback_id_seq', 1, false);


--
-- Name: financialmetrics_metric_id_seq; Type: SEQUENCE SET; Schema: public; Owner: c137
--

SELECT pg_catalog.setval('public.financialmetrics_metric_id_seq', 1, false);


--
-- Name: goalsandmastery_goal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: c137
--

SELECT pg_catalog.setval('public.goalsandmastery_goal_id_seq', 1, false);


--
-- Name: lifestylemetrics_metric_id_seq; Type: SEQUENCE SET; Schema: public; Owner: c137
--

SELECT pg_catalog.setval('public.lifestylemetrics_metric_id_seq', 1, false);


--
-- Name: permissions_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: c137
--

SELECT pg_catalog.setval('public.permissions_permission_id_seq', 1, false);


--
-- Name: psychobehavioralmetrics_metric_id_seq; Type: SEQUENCE SET; Schema: public; Owner: c137
--

SELECT pg_catalog.setval('public.psychobehavioralmetrics_metric_id_seq', 1, false);


--
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: c137
--

SELECT pg_catalog.setval('public.roles_role_id_seq', 1, false);


--
-- Name: timeperiods_time_period_id_seq; Type: SEQUENCE SET; Schema: public; Owner: c137
--

SELECT pg_catalog.setval('public.timeperiods_time_period_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: c137
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);


--
-- Name: FinancialMetrics FinancialMetrics_pkey; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public."FinancialMetrics"
    ADD CONSTRAINT "FinancialMetrics_pkey" PRIMARY KEY (id);


--
-- Name: TimePeriods TimePeriods_pkey; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public."TimePeriods"
    ADD CONSTRAINT "TimePeriods_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_username_key; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);


--
-- Name: assetportfoliometrics assetportfoliometrics_pkey; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.assetportfoliometrics
    ADD CONSTRAINT assetportfoliometrics_pkey PRIMARY KEY (metric_id);


--
-- Name: assetportfoliometrics assetportfoliometrics_user_id_time_period_id_key; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.assetportfoliometrics
    ADD CONSTRAINT assetportfoliometrics_user_id_time_period_id_key UNIQUE (user_id, time_period_id);


--
-- Name: feedbackhistory feedbackhistory_pkey; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.feedbackhistory
    ADD CONSTRAINT feedbackhistory_pkey PRIMARY KEY (feedback_id);


--
-- Name: financialmetrics financialmetrics_pkey; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.financialmetrics
    ADD CONSTRAINT financialmetrics_pkey PRIMARY KEY (metric_id);


--
-- Name: financialmetrics financialmetrics_user_id_time_period_id_key; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.financialmetrics
    ADD CONSTRAINT financialmetrics_user_id_time_period_id_key UNIQUE (user_id, time_period_id);


--
-- Name: goalsandmastery goalsandmastery_pkey; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.goalsandmastery
    ADD CONSTRAINT goalsandmastery_pkey PRIMARY KEY (goal_id);


--
-- Name: lifestylemetrics lifestylemetrics_pkey; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.lifestylemetrics
    ADD CONSTRAINT lifestylemetrics_pkey PRIMARY KEY (metric_id);


--
-- Name: lifestylemetrics lifestylemetrics_user_id_time_period_id_key; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.lifestylemetrics
    ADD CONSTRAINT lifestylemetrics_user_id_time_period_id_key UNIQUE (user_id, time_period_id);


--
-- Name: permissions permissions_permission_name_key; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_permission_name_key UNIQUE (permission_name);


--
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (permission_id);


--
-- Name: psychobehavioralmetrics psychobehavioralmetrics_pkey; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.psychobehavioralmetrics
    ADD CONSTRAINT psychobehavioralmetrics_pkey PRIMARY KEY (metric_id);


--
-- Name: psychobehavioralmetrics psychobehavioralmetrics_user_id_time_period_id_key; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.psychobehavioralmetrics
    ADD CONSTRAINT psychobehavioralmetrics_user_id_time_period_id_key UNIQUE (user_id, time_period_id);


--
-- Name: rolepermissions rolepermissions_pkey; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.rolepermissions
    ADD CONSTRAINT rolepermissions_pkey PRIMARY KEY (role_id, permission_id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- Name: roles roles_role_name_key; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key UNIQUE (role_name);


--
-- Name: timeperiods timeperiods_pkey; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.timeperiods
    ADD CONSTRAINT timeperiods_pkey PRIMARY KEY (time_period_id);


--
-- Name: timeperiods timeperiods_user_id_period_label_key; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.timeperiods
    ADD CONSTRAINT timeperiods_user_id_period_label_key UNIQUE (user_id, period_label);


--
-- Name: userroles userroles_pkey; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.userroles
    ADD CONSTRAINT userroles_pkey PRIMARY KEY (user_id, role_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: idx_assetportfolio_metrics_user_period; Type: INDEX; Schema: public; Owner: c137
--

CREATE INDEX idx_assetportfolio_metrics_user_period ON public.assetportfoliometrics USING btree (user_id, time_period_id);


--
-- Name: idx_feedbackhistory_metric_type_id; Type: INDEX; Schema: public; Owner: c137
--

CREATE INDEX idx_feedbackhistory_metric_type_id ON public.feedbackhistory USING btree (metric_type, associated_metric_id);


--
-- Name: idx_feedbackhistory_source; Type: INDEX; Schema: public; Owner: c137
--

CREATE INDEX idx_feedbackhistory_source ON public.feedbackhistory USING btree (feedback_source);


--
-- Name: idx_feedbackhistory_user_period; Type: INDEX; Schema: public; Owner: c137
--

CREATE INDEX idx_feedbackhistory_user_period ON public.feedbackhistory USING btree (user_id, time_period_id);


--
-- Name: idx_financial_metrics_user_period; Type: INDEX; Schema: public; Owner: c137
--

CREATE INDEX idx_financial_metrics_user_period ON public.financialmetrics USING btree (user_id, time_period_id);


--
-- Name: idx_goalsandmastery_category; Type: INDEX; Schema: public; Owner: c137
--

CREATE INDEX idx_goalsandmastery_category ON public.goalsandmastery USING btree (goal_category);


--
-- Name: idx_goalsandmastery_status; Type: INDEX; Schema: public; Owner: c137
--

CREATE INDEX idx_goalsandmastery_status ON public.goalsandmastery USING btree (status);


--
-- Name: idx_goalsandmastery_user_period; Type: INDEX; Schema: public; Owner: c137
--

CREATE INDEX idx_goalsandmastery_user_period ON public.goalsandmastery USING btree (user_id, time_period_id);


--
-- Name: idx_lifestyle_metrics_user_period; Type: INDEX; Schema: public; Owner: c137
--

CREATE INDEX idx_lifestyle_metrics_user_period ON public.lifestylemetrics USING btree (user_id, time_period_id);


--
-- Name: idx_psychobehavioral_metrics_user_period; Type: INDEX; Schema: public; Owner: c137
--

CREATE INDEX idx_psychobehavioral_metrics_user_period ON public.psychobehavioralmetrics USING btree (user_id, time_period_id);


--
-- Name: idx_rolepermissions_permission_id; Type: INDEX; Schema: public; Owner: c137
--

CREATE INDEX idx_rolepermissions_permission_id ON public.rolepermissions USING btree (permission_id);


--
-- Name: idx_timeperiods_end_date; Type: INDEX; Schema: public; Owner: c137
--

CREATE INDEX idx_timeperiods_end_date ON public.timeperiods USING btree (end_date);


--
-- Name: idx_timeperiods_start_date; Type: INDEX; Schema: public; Owner: c137
--

CREATE INDEX idx_timeperiods_start_date ON public.timeperiods USING btree (start_date);


--
-- Name: idx_timeperiods_user; Type: INDEX; Schema: public; Owner: c137
--

CREATE INDEX idx_timeperiods_user ON public.timeperiods USING btree (user_id);


--
-- Name: idx_userroles_role_id; Type: INDEX; Schema: public; Owner: c137
--

CREATE INDEX idx_userroles_role_id ON public.userroles USING btree (role_id);


--
-- Name: idx_users_email; Type: INDEX; Schema: public; Owner: c137
--

CREATE INDEX idx_users_email ON public.users USING btree (email);


--
-- Name: FinancialMetrics FinancialMetrics_timePeriodId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public."FinancialMetrics"
    ADD CONSTRAINT "FinancialMetrics_timePeriodId_fkey" FOREIGN KEY ("timePeriodId") REFERENCES public."TimePeriods"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: FinancialMetrics FinancialMetrics_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public."FinancialMetrics"
    ADD CONSTRAINT "FinancialMetrics_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TimePeriods TimePeriods_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public."TimePeriods"
    ADD CONSTRAINT "TimePeriods_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: assetportfoliometrics assetportfoliometrics_time_period_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.assetportfoliometrics
    ADD CONSTRAINT assetportfoliometrics_time_period_id_fkey FOREIGN KEY (time_period_id) REFERENCES public.timeperiods(time_period_id) ON DELETE CASCADE;


--
-- Name: assetportfoliometrics assetportfoliometrics_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.assetportfoliometrics
    ADD CONSTRAINT assetportfoliometrics_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: feedbackhistory feedbackhistory_time_period_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.feedbackhistory
    ADD CONSTRAINT feedbackhistory_time_period_id_fkey FOREIGN KEY (time_period_id) REFERENCES public.timeperiods(time_period_id) ON DELETE CASCADE;


--
-- Name: feedbackhistory feedbackhistory_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.feedbackhistory
    ADD CONSTRAINT feedbackhistory_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: financialmetrics financialmetrics_time_period_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.financialmetrics
    ADD CONSTRAINT financialmetrics_time_period_id_fkey FOREIGN KEY (time_period_id) REFERENCES public.timeperiods(time_period_id) ON DELETE CASCADE;


--
-- Name: financialmetrics financialmetrics_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.financialmetrics
    ADD CONSTRAINT financialmetrics_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: goalsandmastery goalsandmastery_time_period_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.goalsandmastery
    ADD CONSTRAINT goalsandmastery_time_period_id_fkey FOREIGN KEY (time_period_id) REFERENCES public.timeperiods(time_period_id) ON DELETE CASCADE;


--
-- Name: goalsandmastery goalsandmastery_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.goalsandmastery
    ADD CONSTRAINT goalsandmastery_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: lifestylemetrics lifestylemetrics_time_period_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.lifestylemetrics
    ADD CONSTRAINT lifestylemetrics_time_period_id_fkey FOREIGN KEY (time_period_id) REFERENCES public.timeperiods(time_period_id) ON DELETE CASCADE;


--
-- Name: lifestylemetrics lifestylemetrics_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.lifestylemetrics
    ADD CONSTRAINT lifestylemetrics_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: psychobehavioralmetrics psychobehavioralmetrics_time_period_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.psychobehavioralmetrics
    ADD CONSTRAINT psychobehavioralmetrics_time_period_id_fkey FOREIGN KEY (time_period_id) REFERENCES public.timeperiods(time_period_id) ON DELETE CASCADE;


--
-- Name: psychobehavioralmetrics psychobehavioralmetrics_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.psychobehavioralmetrics
    ADD CONSTRAINT psychobehavioralmetrics_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: rolepermissions rolepermissions_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.rolepermissions
    ADD CONSTRAINT rolepermissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(permission_id) ON DELETE CASCADE;


--
-- Name: rolepermissions rolepermissions_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.rolepermissions
    ADD CONSTRAINT rolepermissions_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(role_id) ON DELETE CASCADE;


--
-- Name: timeperiods timeperiods_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.timeperiods
    ADD CONSTRAINT timeperiods_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: userroles userroles_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.userroles
    ADD CONSTRAINT userroles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(role_id) ON DELETE CASCADE;


--
-- Name: userroles userroles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: c137
--

ALTER TABLE ONLY public.userroles
    ADD CONSTRAINT userroles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

