import unittest
from unittest.mock import patch
import agent_engine as engine
W='123e4567-e89b-12d3-a456-426614174000'; C='123e4567-e89b-12d3-a456-426614174001'
class EngineTests(unittest.TestCase):
 def test_blocks_private_credentials_ipv6(self):
  for u in ('http://127.0.0.1/','file:///tmp/x','https://a:b@example.com','http://[::1]/'):
   with self.assertRaises(ValueError):engine.safe_url(u)
 def test_structured_extraction(self):
  d=engine.extract_html(b'<title>Rabbit</title><meta name="description" content="Helpful"><h1>Hello</h1><script>x</script><a href="/pricing">P</a>')
  self.assertEqual(d['title'],'Rabbit');self.assertEqual(d['description'],'Helpful');self.assertEqual(d['headings'],['Hello']);self.assertEqual(d['links'],['/pricing'])
 def test_parser_does_not_capture_following_plain_text(self):
  d=engine.extract_html(b'<h1>Heading</h1> plain text')
  self.assertEqual(d['headings'],['Heading'])
 def test_nonstandard_port_rejected(self):
  with self.assertRaises(ValueError):engine.safe_url('https://example.com:8080/')
 def test_ownership_and_fact_provenance(self):
  item=engine.knowledge({'title':'Visible','description':'','headings':[],'links':[],'text':''},'https://example.com',W,C)[0]
  self.assertEqual((item['workspace_id'],item['company_id'],item['kind']),(W,C,'FACT'))
  with self.assertRaises(ValueError):engine.run_research('https://example.com','bad','bad')
 def test_bounded_run_shape(self):
  doc={'links':['/pricing'],'title':'Company','description':'Helpful','headings':[],'text':''}
  with patch.object(engine,'safe_url',side_effect=lambda x:x),patch.object(engine,'fetch',return_value=('https://example.com',doc)):
   run=engine.run_research('https://example.com',W,C)
  self.assertLessEqual(len(run['pages_used']),engine.MAX_PAGES);self.assertTrue(all(x['workspace_id']==W and x['company_id']==C for x in run['knowledge']))
 def test_final_redirect_origin_crawls_final_site_link(self):
  calls=[]
  def fetch(url):
   calls.append(url)
   if len(calls)==1:return 'https://www.example.com/',{'links':['/pricing'],'title':'Home','description':'','headings':[],'text':''}
   return 'https://www.example.com/pricing',{'links':[],'title':'Pricing','description':'','headings':[],'text':''}
  with patch.object(engine,'safe_url',side_effect=lambda x:x),patch.object(engine,'fetch',side_effect=fetch):run=engine.run_research('http://example.com/',W,C)
  self.assertIn('https://www.example.com/pricing',calls);self.assertLessEqual(len(run['pages_used']),engine.MAX_PAGES)
 def test_repeated_statements_are_deduplicated(self):
  docs=[('https://example.com/',{'links':['/pricing'],'title':'Same title','description':'','headings':['Same heading'],'text':''}),('https://example.com/pricing',{'links':[],'title':'Same title','description':'','headings':['Same heading'],'text':''})]
  with patch.object(engine,'safe_url',side_effect=lambda x:x),patch.object(engine,'fetch',side_effect=docs):run=engine.run_research('https://example.com/',W,C)
  self.assertEqual(sum('Same title' in x.get('statement','') for x in run['knowledge']),1)
 def test_pricing_evidence_omits_pricing_unknown(self):
  doc={'links':[],'title':'Pricing','description':'','headings':['Pricing'],'text':''}
  with patch.object(engine,'safe_url',side_effect=lambda x:x),patch.object(engine,'fetch',return_value=('https://example.com/',doc)):run=engine.run_research('https://example.com/',W,C)
  self.assertFalse(any(x['kind']=='UNKNOWN' and x.get('topic')=='pricing' for x in run['knowledge']))
  self.assertTrue(any(x['kind']=='UNKNOWN' for x in run['knowledge']))
 def test_owner_accepts_valid_uuid(self):
  self.assertEqual(engine.owner(W,'workspace_id'),W)
if __name__=='__main__':unittest.main()
