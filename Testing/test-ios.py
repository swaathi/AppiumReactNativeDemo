import os
import unittest
import time
from appium import webdriver
import xml

class AppiumTest(unittest.TestCase):

    def setUp(self):
        abs_path =  os.path.abspath("../ios/DerivedData/DemoTestApp/Build/Products/Release-iphonesimulator/DemoTestApp.app")
        self.driver = webdriver.Remote(
            command_executor='http://127.0.0.1:4723/wd/hub',
            desired_capabilities={
              'app': os.path.abspath(abs_path),
              'platformName': 'iOS',
              'deviceName': 'iPhone Simulator',
              'automationName': 'XCUITest',
        })

    def tearDown(self):
        self.driver.quit()

    def repl(self):
        import pdb; pdb.set_trace()

    def dump_page(self):
        with open('appium_page.xml', 'w') as f:
            raw = self.driver.page_source
            if not raw:
                return
            source = xml.dom.minidom.parseString(raw.encode('utf8'))
            f.write(source.toprettyxml())

    def _get(self, text, index=None, partial=False):
        selector = "name"
        if text.startswith('#'):
            elements = self.driver.find_elements_by_accessibility_id(text[1:])
        elif partial:
            elements = self.driver.find_elements_by_xpath('//*[contains(@%s, "%s")]' % (selector, text))
        else:
            elements = self.driver.find_elements_by_xpath('//*[@%s="%s"]' % (selector, text))
        if not elements:
            raise Exception()
        if index:
            return elements[index]
        if index is None and len(elements) > 1:
            raise IndexError('More that one element found for %r' % text)
        return elements[0]

    def get(self, text, *args, **kwargs):
        ''' try to get for X seconds; paper over loading waits/sleeps '''
        timeout_seconds = kwargs.get('timeout_seconds', 10)
        start = time.time()
        while time.time() - start < timeout_seconds:
            try:
                return self._get(text, *args, **kwargs)
            except IndexError:
                raise
            except:
                pass
            # self.wait(.2)
            time.sleep(.2)
        raise Exception('Could not find text %r after %r seconds' % (
            text, timeout_seconds))

    def wait_until(self, *args, **kwargs):
        # only care if there is at least one match
        return self.get(*args, index=0, **kwargs)

class ExampleTests(AppiumTest):

    def test_loginError(self):
      self.dump_page()
      self.wait_until('Login', partial=True)

      self.get('Please enter your email').send_keys('foo@example.com\n')
      self.get('Please enter your password').send_keys('Password1')

      self.driver.hide_keyboard()
      self.get('Press me to submit', index=1).click()
      self.wait_until('Please check your credentials')
      assert True   
   
    def test_loginSuccess(self):
      self.dump_page()
      self.wait_until('Login', partial=True)

      self.get('Please enter your email').send_keys('dummyemail@example.com\n')
      self.get('Please enter your password').send_keys('121212')

      self.driver.hide_keyboard()
      self.get('Press me to submit', index=1).click()
      self.wait_until('Login Successful')
      assert True

    def test_loginEmptyEmail(self):
      self.dump_page()
      self.wait_until('Login', partial=True)

      self.get('Please enter your email').send_keys('\n')
      self.get('Please enter your password').send_keys('121212')

      self.driver.hide_keyboard()
      self.get('Press me to submit', index=1).click()
      self.wait_until('Please enter your email ID')
      assert True   

    def test_loginEmptyPassword(self):
      self.dump_page()
      self.wait_until('Login', partial=True)

      self.get('Please enter your email').send_keys('dummyemail@example.com\n')
      self.get('Please enter your password').send_keys('')
      self.driver.hide_keyboard()
      self.get('Press me to submit', index=1).click()
      self.wait_until('Please enter your password')
      assert True      